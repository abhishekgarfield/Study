import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerification from './src/components/Autorization/otpVerification';
import Home from './src/components/screens/Homescreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Detail from './src/components/screens/detailscreen';
import Test from './src/components/screens/testscreen';
import { View } from 'react-native';

const Stack = createNativeStackNavigator()
const TabStack = createBottomTabNavigator();
const Drawer = createDrawerNavigator()
console.warn = () => {}

const TabBarIcon = ({focused, color, size}) => {
  return(
    <View>
      <View>

      </View>
    </View>
  )
}

const BottomTabStack = () => {
  return(
    <TabStack.Navigator
    screenOptions={({route})=>({
      headerShown:false,
      tabBarIcon:({focused,color,size})=>{
        let iconName = '';
        if(route.name == 'Home'){
          iconName = focused ? 'home-thermometer-outline' : 'home-thermometer-outline'
        }else{
          iconName = focused ? 'home-thermometer-outline' : 'home-thermometer-outline'
        }

        return
      }
    })}>
      <TabStack.Screen name='Home' component={Home}/>
      <TabStack.Screen name='Details' component={Detail}/>
    </TabStack.Navigator>
  )
}

const HomeStack = () =>{
  return(
    <Drawer.Navigator>
      <Drawer.Screen name='HomeTabs' component={BottomTabStack}/>
      <Drawer.Screen name='test' component={Test}/>
    </Drawer.Navigator>
  )
}

const LoginStack = () =>{
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false,animation:'default',animationDuration:1000}}>
        <Stack.Screen
          name={'potalChoice'}
          component={PortalChoice}></Stack.Screen>
        <Stack.Screen
          name={'authModal'}
          component={AuthModal}></Stack.Screen>
        <Stack.Screen
          name={'otpVerification'}
          component={OtpVerification}></Stack.Screen>
      </Stack.Navigator>
    )
}



const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}} initialRouteName='HomeStack'>
        <Stack.Screen component={LoginStack} name="Login" />
        <Stack.Screen component={HomeStack} name="HomeStack" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
