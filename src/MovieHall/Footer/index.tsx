import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Footer: React.FC = () => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.continueButton}>
        <Text style={{ color: 'white' }}>PAY</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    bottom: 0,
    padding: 20,
    backgroundColor: '#000000aa',
    zIndex: 300,
  },
  continueButton: {
    height: 60,
    borderRadius: 5,
    width: '100%',
    backgroundColor: '#EF311F',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
