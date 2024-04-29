import * as React from 'react';
import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LoginStack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <LoginStack.Navigator screenOptions={{
        headerShown:false
      }}>
          <LoginStack.Screen name={'potalChoice'} component={PortalChoice}></LoginStack.Screen>
          <LoginStack.Screen name={'authModal'} component={AuthModal}></LoginStack.Screen>
      </LoginStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
