/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import { AntDesign } from '@react-native-vector-icons/ant-design';
import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';

const FACTOR = 30;
const VIDEO_HEIGHT = 9 * FACTOR;
const VIDEO_WIDTH = 16 * FACTOR;

const ScreenViewPlaceholder = () => {
  const videoRef = useRef<VideoRef>(null);
  const videoRef2 = useRef<VideoRef>(null);
  const background = require('../../../assets/videos/supermanTrailer.mp4');

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
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View style={{ flexDirection: 'row', gap: 20 }}>
        <AntDesign name="arrow-up" size={20} color={'white'} />

        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Focus your eyeballs this direction
        </Text>

        <AntDesign name="arrow-up" size={20} color={'white'} />
      </View>
      <View
        style={{
          height: VIDEO_HEIGHT + 10,
          width: VIDEO_WIDTH + 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            zIndex: 200,
            height: VIDEO_HEIGHT,
            width: VIDEO_WIDTH,
            transform: [
              { perspective: 800 }, // Required for 3D
              { rotateX: '-50deg' }, // Tilt forward/back
            ],
          }}
        >
          <Video
            // muted
            controls={false}
            ref={videoRef}
            // playInBackground
            source={background}
            mixWithOthers="mix"
            style={{ width: VIDEO_WIDTH, height: VIDEO_HEIGHT }}
            resizeMode="cover"
            repeat
          />
        </View>
        <View
          style={{
            borderColor: '#373737ff',
            borderWidth: 1,
            // borderRadius: 10,
            // backgroundColor: '#373737ff',
            position: 'absolute',
            zIndex: -1200,
            height: VIDEO_HEIGHT + 3,
            width: VIDEO_WIDTH + 5,
            transform: [
              { perspective: 800 }, // Required for 3D
              { rotateX: '-50deg' }, // Tilt forward/back
            ],
          }}
        />
      </View>
    </View>
  );
};

export default ScreenViewPlaceholder;
