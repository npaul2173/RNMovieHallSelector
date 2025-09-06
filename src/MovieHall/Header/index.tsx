import { StyleSheet, Text, View } from 'react-native';

export const HEADER_HEIGHT = 80;
export const Header: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>The Conjuring: Last Rites </Text>
        <Text style={styles.description}>PVR:Diamond plaza, New work </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    width: 500,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 200,
    padding: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
    letterSpacing: -0.5,
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: 300,
  },
});
