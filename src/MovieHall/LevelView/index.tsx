import { Text, View } from 'react-native';
import { MovieHallStructure } from '../types';

export const LevelView: React.FC<{ data: MovieHallStructure }> = ({ data }) => {
  return (
    <View
      style={{
        gap: 160,
        paddingTop: 60,
        flexDirection: 'column-reverse',
        backgroundColor: '#333333',
        borderRadius: 5,
        paddingHorizontal: 10,
      }}
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
    </View>
  );
};
