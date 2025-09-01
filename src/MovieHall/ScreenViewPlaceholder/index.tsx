/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import MaskedView from '@react-native-masked-view/masked-view';
import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Video, { VideoRef } from 'react-native-video';

const FACTOR = 30;
const VIDEO_HEIGHT = 9 * FACTOR;
const VIDEO_WIDTH = 16 * FACTOR;

const ScreenViewPlaceholder = () => {
  // Define trapezium points
  // const topWidth = width * 0.6; // top width smaller
  // const bottomWidth = width * 0.9; // bottom width larger
  // const height = VIDEO_HEIGHT;
  const videoRef = useRef<VideoRef>(null);
  const rotateX = useSharedValue(70); // initial rotateX in degrees

  // const path = `
  //   M ${(width - topWidth) / 2} 0
  //   L ${(width + topWidth) / 2} 0
  //   L ${(width + bottomWidth) / 2} ${height}
  //   L ${(width - bottomWidth) / 2} ${height}
  //   Z
  // `;
  const background = require('../../../assets/videos/videoSample2.mp4');

  rotateX.value = withRepeat(
    withTiming(60, {
      duration: 5000,
      easing: Easing.inOut(Easing.ease),
    }),
    -1,
    true, // reverse
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 800 }, { rotateX: `${rotateX.value}deg` }],
  }));
  console.log(animatedStyle);

  useEffect(() => {
    setTimeout(() => {
      const goTo10Seconds = () => {
        if (videoRef.current) {
          videoRef.current.seek(93); // seek to 10 seconds
        }
      };
      goTo10Seconds();
      videoRef.current?.pause();
    }, 100);
  }, []);

  return (
    <Animated.View
      style={{
        height: VIDEO_HEIGHT,
        width: VIDEO_WIDTH,
        // transform: [
        //   { perspective: 800 }, // Required for 3D
        //   { rotateX: '70deg' }, // Tilt forward/back
        //  ],
        ...animatedStyle,
      }}
    >
      <MaskedView
        style={{
          flex: 1,
          flexDirection: 'row',
          height: '100%',
          backgroundColor: 'red',
          overflow: 'hidden', // <-- Add this
        }}
        maskElement={
          <View
            style={{
              height: VIDEO_HEIGHT,
              width: VIDEO_WIDTH,
            }}
          ></View>
        }
        // style={{ height }}
        // maskElement={
        //   <Svg width={width} height={height}>
        //     <Path d={path} fill="black" />
        //   </Svg>
        // }
      >
        <Video
          ref={videoRef}
          source={background}
          style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}
          resizeMode="cover"
          repeat
        />
      </MaskedView>
    </Animated.View>
  );
};

export default ScreenViewPlaceholder;
