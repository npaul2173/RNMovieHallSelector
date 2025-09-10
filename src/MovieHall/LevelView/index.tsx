import { Text, View, StyleSheet } from 'react-native';
import { MovieHallStructure } from '../types';
import Animated from 'react-native-reanimated';
import { HEADER_HEIGHT } from '../Header';

export const LevelView: React.FC<{
  data: MovieHallStructure;
  levelStyles: any;
}> = ({ data, levelStyles }) => {
  return (
    <Animated.View style={[styles.container, levelStyles]}>
      {data.sections.map((sec, secIndex) => (
        <View key={secIndex} style={styles.section}>
          {sec.rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              <Text style={styles.rowText}>{row.id}</Text>
            </View>
          ))}
        </View>
      ))}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    top: HEADER_HEIGHT + 40, // adjust if needed
    backgroundColor: '#ae202c2f',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 60,
    gap: 160,
    flexDirection: 'column-reverse',
    zIndex: 200,
  },
  section: {
    gap: 10,
  },
  row: {
    width: 30,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e14c4f7d',
  },
  rowText: {
    color: 'white',
  },
});
