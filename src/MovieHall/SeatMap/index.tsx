import { StyleSheet, Text, View } from 'react-native';
import { MovieHallStructure } from '../types';
import { SeatView } from '../Seat';
export const SeatMap: React.FC<{ data: MovieHallStructure }> = ({ data }) => {
  return (
    <View>
      <View style={styles.container}>
        {data.sections.map((section, sectionIndex) => {
          return (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <View style={{ padding: 20 }}>
                <Text style={styles.section}> Section {section.name} </Text>
              </View>

              <View style={styles.sectionRowContainer}>
                {/* ROWS */}
                {section.rows.map((row, rowIndex) => {
                  return (
                    <View key={rowIndex} style={styles.rowContainer}>
                      {/* SEATS */}
                      {row.seats.map((seat, seatIndex) => {
                        return <SeatView key={seatIndex} data={seat} />;
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 100,
    flexDirection: 'column-reverse',
  },
  section: {
    color: 'white',
  },
  rowContainer: {
    flexDirection: 'row-reverse',
    gap: 5,
  },
  sectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionRowContainer: {
    // backgroundColor: '#999999',
    // flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'column-reverse',
  },
  blankAllocation: {
    height: 40,
    width: 40,
    // backgroundColor: '#171717ff',
  },
  seatContainer: {
    // backgroundColor: 'red',
    transform: [{ rotateZ: '180deg' }],
  },
});
