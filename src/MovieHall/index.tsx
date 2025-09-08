import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  findNodeHandle,
  Pressable,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  UIManager,
  View,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SeatMap } from './SeatMap';
import { movieHallStructure } from './constants';
import { Header, HEADER_HEIGHT } from './Header';
import ScreenViewPlaceholder from './ScreenViewPlaceholder';
import { LevelView } from './LevelView';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PADDING = 40;
const MAP_WIDTH = 1500;
const MAP_HEIGHT = 1800;

export const MovieHall: React.FC = () => {
  const translateX = useSharedValue(-500);
  const translateY = useSharedValue(-300);
  const insets = useSafeAreaInsets();

  console.log(translateX.value, translateY.value, insets);

  const [mapWidth, setMapWidth] = useState(MAP_WIDTH);
  const [mapHeight, setMapHeight] = useState(MAP_HEIGHT);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const mapRef = useRef<View>(null);
  const scale = useSharedValue(1); // 🔑 zoom
  const startScale = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate(event => {
      // Raw values
      let nextX = startX.value + event.translationX;
      let nextY = startY.value + event.translationY;

      // Calculate limits
      const minX = SCREEN_WIDTH - PADDING * 2 - mapWidth; // left boundary
      const maxX = 0; // left boundary
      const minY = SCREEN_HEIGHT - PADDING * 2 - mapHeight; // top boundary
      const maxY = 0; // left boundary

      // Clamp
      translateX.value = Math.min(Math.max(nextX, minX), maxX);
      translateY.value = Math.min(Math.max(nextY, minY), maxY);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Measure actual rendered size AFTER the layout is complete
  useEffect(() => {
    if (mapRef.current) {
      const handle = findNodeHandle(mapRef.current);
      if (handle) {
        setTimeout(() => {
          UIManager.measure(handle, (_x, _y, width, height) => {
            setMapWidth(width);
            setMapHeight(height);
            console.log('Final measured size:', width, height);
          });
        }, 0);
      }
    }
  }, []);
  console.log({ mapWidth, mapHeight });

  // 🔍 Pinch gesture for zoom
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      startScale.value = scale.value;
    })
    .onUpdate(event => {
      let nextScale = startScale.value * event.scale;
      // Clamp zoom between 0.5x and 3x
      scale.value = Math.min(Math.max(nextScale, 0.5), 1);
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  const containerStyles: StyleProp<ViewStyle> = useMemo(
    () => [
      styles.container,
      { backgroundColor: 'red', padddingBottom: insets.bottom },
    ],
    [insets.bottom],
  );
  return (
    <SafeAreaView style={containerStyles} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Header />

      <GestureDetector gesture={composed}>
        <Animated.View
          ref={mapRef}
          style={[
            styles.seatMap,
            animatedStyle,
            { width: mapWidth, height: mapHeight },
          ]}
        >
          <ScreenViewPlaceholder />
          <View style={styles.seatsContainer}>
            <LevelView data={movieHallStructure} />
            <SeatMap data={movieHallStructure} />
          </View>
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.continueButton}>
          <Text style={{ color: 'white' }}>PAY</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: PADDING,
    paddingTop: PADDING + HEADER_HEIGHT,
    // backgroundColor: 'black',
    backgroundColor: 'rgba(28, 28, 28, 1)',
  },
  buttonContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    bottom: 0,
    padding: 20,
  },
  continueButton: {
    height: 60,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#EF311F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatMap: {
    // width: MAP_WIDTH, // movie hall width
    // height: MAP_HEIGHT, // movie hall height
    backgroundColor: '#000000ff',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  seatsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10,
  },
});
