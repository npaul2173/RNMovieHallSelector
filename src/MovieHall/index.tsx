import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  findNodeHandle,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const PADDING = 40;
const MAP_WIDTH = 1000;
const MAP_HEIGHT = 1000;

export const MovieHall: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
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
      scale.value = Math.min(Math.max(nextScale, 0.5), 3);
    });

  const composed = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <View style={styles.container}>
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
          <SeatMap data={movieHallStructure} />
          {/* Render your seats here */}
          {/* {arr.map((_, index) => {
            return (
              <View style={{ flexDirection: 'row', padding: 10 }} key={index}>
                {arr.map((_, ind) => {
                  // return <View key={ind} style={styles.seat} />;
                  return (
                    <Seat height={40} width={40} color={'#1D2626'} key={ind} />
                  );
                })}
              </View>
            );
          })} */}
        </Animated.View>
      </GestureDetector>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.continueButton}>
          <Text style={{ color: 'white' }}>PAY</Text>
        </Pressable>
      </View>
    </View>
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
  seat: {
    width: 40,
    height: 40,
    margin: 10,
    backgroundColor: '#494949ff',
  },
});
