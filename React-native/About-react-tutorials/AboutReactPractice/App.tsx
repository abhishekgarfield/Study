import 'react-native-gesture-handler';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, LogBox, PermissionsAndroid, Platform, View} from 'react-native';
import FirstScreen from './components/firstScreen';
import SecondScreen from './components/secondScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ThirdScreen from './components/thirdScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Header from './components/header';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './components/home';
import Profile from './components/profile';
import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import { request } from 'react-native-permissions';
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
const ThirdStack = createNativeStackNavigator();
const FourthStack = createNativeStackNavigator();
const SecondStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const FirstStackNav = () => {
  return (
    <FirstStack.Navigator screenOptions={{headerShown: false}}>
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
const DrawerStack = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          console.log('-------------- focused ---------', focused);
          return (
            <Image
              src="https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png"
              style={{
                width: size,
                height: size,
                borderRadius: size,
              }}
            />
          );
        },
      }}>
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Home',
        }}
        component={FirstStackNav}
        name="firstbottomtab"
      />
      <BottomTab.Screen
        options={{
          tabBarLabel: 'Settings',
        }}
        component={SecontabStack}
        name="secondbottomtab"
      />
    </BottomTab.Navigator>
  );
};

const SecontabStack = () => {
  return (
    <ThirdStack.Navigator>
      <ThirdStack.Screen component={Profile} name="Profile" />
    </ThirdStack.Navigator>
  );
};

const FirsttabStack = () => {
  return (
    <FourthStack.Navigator>
      <FourthStack.Screen component={Home} name="home" />
    </FourthStack.Navigator>
  );
};
const App = () => {
  global.variable = 10; // accessible in whole app

  /* check on android --------  */
  console.log(
    '---------- permission android -------',
    PermissionsAndroid.PERMISSIONS,
  );
  console.log('----- permision aaccepted --------', PermissionsAndroid.RESULTS);
  if (Platform.OS == 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      message: 'CHECK MESSAGE',
      title: 'SFDSFSDFSF',
      buttonPositive: 'asdasdasdasd',
      buttonNegative: 'sadasdasdasdasd',
    });
  }

  const requestLocationPermission = () => {
    let watchId;
    if (Platform.OS == 'ios') {
      console.log('---dsf-sdf-s-df-sd-f-');
      Geolocation.requestAuthorization((success)=>{
            console.log("----s-d-s-d-as-d",success)
      },(err)=>{
        console.log("000--------err-----",err)
      });
      Geolocation.getCurrentPosition(
        position => {
          console.log('------ position ios-------', position);
        },
        err => {
          console.log('----errr-----', err);
        },
      );
      watchId = SubscribtTolocation();
    }
    return watchId;
  };

  const SubscribtTolocation = () => {
    let watchId = Geolocation.watchPosition(position => {
      console.log('----- watching posiitoin ----', position);
    });

    return watchId;
  };
  useEffect(() => {
    request('ios.permission.CAMERA').then((result)=>{
      console.log(result)
    })
    request('ios.permission.LOCATION_ALWAYS').then(result => console.log("----result ----",result))
    let watchId = requestLocationPermission();

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Drawer.Navigator
          initialRouteName="firststack"
          screenOptions={{
            headerShown: true,
            headerTransparent: false,
            headerTitle: '',
            drawerStyle: {
              backgroundColor: 'black',
            },
            // headerLeft: () => <Header/>,
            header: () => <Header />,

            drawerItemStyle: {
              backgroundColor: 'white',
            },
            drawerContentContainerStyle: {
              backgroundColor: 'black',
            },
          }}>
          <Drawer.Screen component={DrawerStack} name="firststack" />
          <Drawer.Screen component={SecondStackNav} name="secondstack" />
        </Drawer.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
