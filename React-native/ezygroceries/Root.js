import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerification from './src/components/Autorization/otpVerification';
import Home from './src/components/screens/Homescreen';
import { useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';

const Stack = createNativeStackNavigator()


const LoginStack = () =>{
    return(
        <Stack.Navigator
        screenOptions={{headerShown:false,animation:'default',animationDuration:1000,}}>
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

const HomeStack = () =>{
    return(
        <Stack.Navigator>
            <Stack.Screen component={Home} name='home'/>
        </Stack.Navigator>
    )
}

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false,animation:'slide_from_left',animationDuration:1000,gestureDirection:'horizontal',
          presentation: 'card',}} initialRouteName='login'>
        <Stack.Screen component={LoginStack} name="login" />
        <Stack.Screen component={HomeStack} name="home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
