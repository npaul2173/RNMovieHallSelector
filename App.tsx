/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MovieHall } from './src/MovieHall';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <>
      <GestureHandlerRootView>
        <MovieHall />
      </GestureHandlerRootView>
    </>
  );
}

export default App;
