import 'react-native-gesture-handler';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, LogBox, View} from 'react-native';
import FirstScreen from './components/firstScreen';
import SecondScreen from './components/secondScreen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import ThirdScreen from './components/thirdScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Header from './components/header';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/home'
import Profile from './components/profile';
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
const FourthStack = createNativeStackNavigator()
const SecondStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const FirstStackNav = () => {
  return (
    <FirstStack.Navigator screenOptions={{headerShown:false}}>
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
const DrawerStack = () =>{
  return(
    <BottomTab.Navigator screenOptions={{
      headerShown:false,
      tabBarIcon:({focused, color,size})=>{
        console.log("-------------- focused ---------",focused)
        return(
            <Image src='https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png'  style={{
              width: size,
              height: size,
              borderRadius: size,
            }}/>
        )
      }
    }}>
      <BottomTab.Screen  options={{
        tabBarLabel:'Home',
      }}component={FirstStackNav} name='firstbottomtab'/>
      <BottomTab.Screen options={{
        tabBarLabel:'Settings'
      }}component={SecontabStack} name='secondbottomtab'/>
    </BottomTab.Navigator>
  )
}

const SecontabStack = () =>{
  return(
    <ThirdStack.Navigator>
      <ThirdStack.Screen component={Profile} name='Profile'/>
    </ThirdStack.Navigator>
  )
}

const FirsttabStack = () =>{
  return(
    <FourthStack.Navigator>
      <FourthStack.Screen component={Home} name='home'/>
    </FourthStack.Navigator>
  )
}
const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
      <Drawer.Navigator
          initialRouteName="firststack"
          screenOptions={{
            headerShown: true,
            headerTransparent:false,
            headerTitle:'',
            drawerStyle:{
              backgroundColor:'black'
            },
            // headerLeft: () => <Header/>,
            header:() => <Header/>,

            drawerItemStyle:{
              backgroundColor:'white'
            },
            drawerContentContainerStyle:{
              backgroundColor:'black'
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
