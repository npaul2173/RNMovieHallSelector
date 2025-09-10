import { Text, View } from 'react-native';
import { MovieHallStructure } from '../types';
import Animated from 'react-native-reanimated';

export const LevelView: React.FC<{
  data: MovieHallStructure;
  levelStyles: any;
}> = ({ data, levelStyles }) => {
  console.log('levelStyles', levelStyles);

  return (
    <Animated.View
      style={[
        levelStyles,
        {
          gap: 160,
          paddingTop: 60,
          flexDirection: 'column-reverse',
          backgroundColor: '#333333',
          borderRadius: 5,
          paddingHorizontal: 10,
          // zIndex: 200,
          // left: 16,
        },
      ]}
    >
      {data.sections.map((sec, secIndex) => {
        return (
          <View key={secIndex} style={{ gap: 10 }}>
            {sec.rows.map((row, rowIndex) => {
              return (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#444444',
                  }}
                  key={rowIndex}
                >
                  <Text style={{ color: 'white' }}>{row.id}</Text>
                </View>
              );
            })}
          </View>
        );
      })}
    </Animated.View>
  );
};
