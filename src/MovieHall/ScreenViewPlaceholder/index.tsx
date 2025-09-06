/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';

const FACTOR = 30;
const VIDEO_HEIGHT = 9 * FACTOR;
const VIDEO_WIDTH = 16 * FACTOR;

const ScreenViewPlaceholder = () => {
  const videoRef = useRef<VideoRef>(null);
  const videoRef2 = useRef<VideoRef>(null);
  const background = require('../../../assets/videos/supermanTrailerCopy.mp4');

  useEffect(() => {
    setTimeout(() => {
      const goTo10Seconds = () => {
        if (videoRef.current && videoRef2.current) {
          videoRef.current.seek(93); // seek to 10 seconds
          videoRef2.current.seek(93); // seek to 10 seconds
        }
      };
      goTo10Seconds();
      // videoRef.current?.pause();
      // videoRef2.current?.pause();
    }, 100);
  }, []);

  return (
    <View
      style={{
        height: VIDEO_HEIGHT + 50,
        width: VIDEO_WIDTH + 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: '#373737ff',
          position: 'absolute',
          height: VIDEO_HEIGHT + 20,
          width: VIDEO_WIDTH + 20,
          transform: [
            { perspective: 800 }, // Required for 3D
            { rotateX: '-50deg' }, // Tilt forward/back
          ],
        }}
      />
      <View
        style={{
          position: 'absolute',

          height: VIDEO_HEIGHT,
          width: VIDEO_WIDTH,
          transform: [
            { perspective: 800 }, // Required for 3D
            { rotateX: '-50deg' }, // Tilt forward/back
          ],
        }}
      >
        <Video
          muted
          ref={videoRef}
          playInBackground
          source={background}
          mixWithOthers="mix"
          style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}
          resizeMode="cover"
          repeat
        />
      </View>
    </View>
  );
};

export default ScreenViewPlaceholder;
