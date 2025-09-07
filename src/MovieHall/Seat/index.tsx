import { SeatProps } from '../types';
import Seat from '../../../assets/svgs/Seat.svg';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSeatStore } from '../../store/seatStore';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const SeatView: React.FC<{ data: SeatProps }> = ({ data }) => {
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
            <View
              style={{
                width: 40,
                height: 40,
                // backgroundColor: 'wheat',
                position: 'absolute',
                zIndex: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>{data.seat.substring(1)}</Text>
            </View>
            <View style={styles.seatContainer}>
              <Seat
                height={40}
                width={40}
                color={isSelected ? '#EF311F' : '#2c3030ff'}
              />
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
  seatWrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
