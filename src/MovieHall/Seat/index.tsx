import { SeatProps } from '../types';
import Seat from '../../../assets/svgs/Seat.svg';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useSeatStore } from '../../store/seatStore';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useMemo } from 'react';

const SEAT_UNAVAILABLE_BG = '#222222ff';
const SEAT_INACTIVE_BG = '#3b3b3bff';
const SEAT_ACTIVE_BG = 'rgba(240, 240, 240, 1)';

const SEAT_UNAVAILABLE_COLOR = '#585858ff';
const SEAT_INACTIVE_COLOR = '#dededeff';
const SEAT_ACTIVE_COLOR = 'rgba(9, 9, 9, 1)';

export const SeatView: React.FC<{ data: SeatProps; isIcon: boolean }> = ({
  data,
  isIcon = false,
}) => {
  const toggleSeat = useSeatStore(state => state.toggleSeat);
  const isSelected = useSeatStore(state => state.isSelected(data.id));

  // Scale value for press animation
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 10, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
  };

  const seatStyle: StyleProp<ViewStyle> = useMemo(
    () => ({
      backgroundColor: data.isSold
        ? SEAT_UNAVAILABLE_BG
        : isSelected
        ? SEAT_ACTIVE_BG
        : SEAT_INACTIVE_BG,
      height: 40,
      width: 40,
      borderRadius: 5,
    }),
    [data.isSold, isSelected],
  );

  const seatLayerStyle: StyleProp<TextStyle> = useMemo(
    () => ({
      color: data.isSold
        ? SEAT_UNAVAILABLE_COLOR
        : isSelected
        ? SEAT_ACTIVE_COLOR
        : SEAT_INACTIVE_COLOR,
    }),
    [data.isSold, isSelected],
  );
  return (
    <View key={data.id}>
      {/* <Text> {seat.seat}</Text> */}
      {data.seat === null ? (
        <BlankSpaceAllocation />
      ) : (
        <Pressable
          onPress={() => toggleSeat(data.id)}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[styles.seatWrapper, animatedStyle]}>
            <View style={styles.seatUpperWrapper}>
              <Text style={[styles.seatData, seatLayerStyle]}>
                {data.seat.substring(1)}
              </Text>
            </View>
            <View style={styles.seatContainer}>
              {!isIcon ? (
                <View style={seatStyle} />
              ) : (
                <Seat
                  width={40}
                  height={40}
                  color={isSelected ? SEAT_ACTIVE_BG : SEAT_INACTIVE_BG}
                />
              )}
            </View>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

const BlankSpaceAllocation = () => {
  return (
    <View style={styles.blankAllocation}>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  blankAllocation: {
    height: 40,
    width: 40,
    // backgroundColor: '#171717ff',
  },
  seatContainer: {
    // backgroundColor: 'red',
    transform: [{ rotateZ: '180deg' }],
  },
  seatData: {
    color: 'white',
  },
  seatWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatUpperWrapper: {
    width: 40,
    height: 40,
    position: 'absolute',
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
