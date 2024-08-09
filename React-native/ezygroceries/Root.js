import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerification from './src/components/Autorization/otpVerification';
import Home from './src/components/screens/Homescreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Detail from './src/components/screens/detailscreen';
import Test from './src/components/screens/testscreen';
import {View} from 'react-native';
import rootStyles from './src/styles/rootStyles';
import {MaterialCommunityIcons} from './src/assets/icons';
import { black, primaryColor } from './src/components/Common/colors';
import Profile from './src/components/screens/profilescreen';
import Stat from './src/components/screens/statscreen';
import Second from './src/components/screens/secondscreen';
import Employee from './src/components/screens/employeescreen';

const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
console.warn = () => {};


const TabBarIcon = ({ focused, iconName, color, size }) => {
  return (
    <View style={rootStyles.iconContainer}>
      <View style={[rootStyles.circle, focused && rootStyles.focusedCircle]}>
        <MaterialCommunityIcons name={iconName} size={size * 1} color={color} />
      </View>
    </View>
  );
};

const BottomTabStack = () => {
  return (
    <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle:{
          height:75,
          backgroundColor:black,
          margin:5,
          marginBottom:9,
          marginHorizontal:20,
          borderRadius:50,
          paddingBottom:0,
        },
        tabBarShowLabel:false,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name == 'Home') {
            iconName = !focused
              ? 'home-thermometer-outline'
              : 'home-thermometer';
          } else if(route.name== 'Profile') {
            iconName = !focused
              ? 'account-edit-outline'
              : 'account-edit';
          }else if(route.name== 'Orders') {
            iconName = !focused
              ? 'basket-check-outline'
              : 'basket-check';
          }else if(route.name== 'Employees') {
            iconName = !focused
              ? 'account-group-outline'
              : 'account-group';
          }else if(route.name== 'Stat') {
            iconName = !focused
              ? 'chart-line'
              : 'chart-line-stacked';
          }

          return (
            <TabBarIcon
              focused={focused}
              color={color}
              size={size}
              iconName={iconName}
            />
          );
        },
      })}>
      <TabStack.Screen name="Home" component={Home} />
      <TabStack.Screen name="Orders" component={Detail} />
      <TabStack.Screen name="Stat" component={Stat} />
      <TabStack.Screen name="Employees" component={Employee} />
      <TabStack.Screen name="Profile" component={Profile} />
    </TabStack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="HomeTabs" component={BottomTabStack} />
      <Drawer.Screen name="test" component={Test} />
    </Drawer.Navigator>
  );
};

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'default',
        animationDuration: 1000,
      }}>
      <Stack.Screen
        name={'potalChoice'}
        component={PortalChoice}></Stack.Screen>
      <Stack.Screen name={'authModal'} component={AuthModal}></Stack.Screen>
      <Stack.Screen
        name={'otpVerification'}
        component={OtpVerification}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}} initialRouteName="HomeStack">
        <Stack.Screen component={LoginStack} name="Login" />
        <Stack.Screen component={HomeStack} name="HomeStack" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
