import './gesture-handler';
import 'react-native-gesture-handler';
import * as React from 'react';
import {LogBox, View} from 'react-native';
import Root from './Root';
import {useEffect} from 'react';

import FlashMessage from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import AppDataStore from './store';

console.warn = () => {};
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <View style={styles.container}>
      <AppDataStore>
        <Root />
      </AppDataStore>
      <FlashMessage position={'top'} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
};

export default App;
