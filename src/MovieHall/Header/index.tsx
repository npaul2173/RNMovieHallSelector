import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('screen');
export const HEADER_HEIGHT = 100;
export const Header: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <Text style={styles.title}>Superman 2025</Text>
        <Text style={styles.description}>PVR:Diamond plaza, New work </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEADER_HEIGHT,
    // width: 500,
    // width: '100%',
    width,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 500,
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
