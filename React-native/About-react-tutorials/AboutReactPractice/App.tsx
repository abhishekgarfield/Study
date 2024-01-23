import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import FirstScreen from './components/firstScreen';
import SecondScreen from './components/secondScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ThirdScreen from './components/thirdScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

LogBox.ignoreAllLogs();

/*
./ searches fr file in same directory we are currently in
../ one level up from current directory
../../ 2 level up from current directory
/ dearches in root
*/

/*
stack navigator
drawer navigator
bottom tab navigator
top tab navigator

*/
const FirstStack = createNativeStackNavigator();
const SecondStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const FirstStackNav = () => {
  return (
    <FirstStack.Navigator>
      <FirstStack.Screen
        component={FirstScreen}
        name="firstscreen"
        initialParams={{userId: 1}}
      />
      <FirstStack.Screen component={SecondScreen} name="secondscreen" />
    </FirstStack.Navigator>
  );
};

const SecondStackNav = () => {
  return (
    <SecondStack.Navigator>
      <SecondStack.Screen component={ThirdScreen} name="thirdscreen" />
    </SecondStack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Drawer.Navigator
          initialRouteName="firststack"
          screenOptions={{
            headerShown: false,
          }}>
          <Drawer.Screen component={FirstStackNav} name="firststack" />
          <Drawer.Screen component={SecondStackNav} name="secondstack" />
        </Drawer.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
