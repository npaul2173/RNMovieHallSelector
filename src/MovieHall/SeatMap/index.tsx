import { StyleSheet, Text, View } from 'react-native';
import { MovieHallStructure } from '../types';
import Seat from '../../../assets/svgs/Seat.svg';
export const SeatMap: React.FC<{ data: MovieHallStructure }> = ({ data }) => {
  return (
    <View>
      <Text style={styles.hallName}>{data.name}</Text>
      <View style={styles.container}>
        {data.sections.map((section, sectionIndex) => {
          return (
            <View key={sectionIndex} style={styles.sectionContainer}>
              <Text style={styles.section}> Section {section.name} </Text>

              {/* ROWS */}
              {section.rows.map((row, rowIndex) => {
                return (
                  <View key={rowIndex} style={styles.rowContainer}>
                    {/* SEATS */}
                    {row.seats.map((seat, seatIndex) => {
                      console.log();

                      return (
                        <View key={seatIndex}>
                          {/* <Text> {seat.seat}</Text> */}
                          {seat.seat === null ? (
                            <BlankSpaceAllocation />
                          ) : (
                            <Seat height={40} width={40} color={'#2c3030ff'} />
                          )}
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
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
  container: {
    gap: 100,
  },
  hallName: {
    color: 'white',
  },
  section: {
    color: 'white',
  },
  rowContainer: {
    // backgroundColor: 'wheat',
    flexDirection: 'row',
    gap: 5,
  },
  sectionContainer: {
    // backgroundColor: '#999999',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  blankAllocation: {
    height: 40,
    width: 40,
    // backgroundColor: '#171717ff',
  },
});
