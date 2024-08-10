import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerification from './src/components/Autorization/otpVerification';
import Home from './src/components/screens/Homescreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Test from './src/components/screens/testscreen';
import {Image, Linking, Text, View, ViewBase} from 'react-native';
import rootStyles, {drawerStyles} from './src/styles/rootStyles';
import {MaterialCommunityIcons} from './src/assets/icons';
import {black, primaryColor} from './src/components/Common/colors';
import Profile from './src/components/screens/profilescreen';
import Stat from './src/components/screens/statscreen';
import Employee from './src/components/screens/employeescreen';
import Order from './src/components/screens/detailscreen';

const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.profileCircle}>
          {false ? (
            <Text style={drawerStyles.profileText}>F</Text>
          ) : (
            <Image
              style={drawerStyles.profilePhoto}
              source={require('./src/assets/images/sampDp2.jpg')}
            />
          )}
        </View>
        <Text style={drawerStyles.text}>Faith Gaiciumia</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor={primaryColor}
        label={'Help'}
        icon={({color,focused,size}) => {
          return (
            <MaterialCommunityIcons
              name={'help-circle'}
              size={size}
              color={color}
            />
          );
        }}
        onPress={() => Linking.openURL('www.google.com')}
      />
    </DrawerContentScrollView>
  );
};

const TabBarIcon = ({focused, iconName, color, size}) => {
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
        tabBarStyle: {
          height: 75,
          backgroundColor: black,
          marginBottom: 9,
          marginHorizontal: 17,
          marginTop:5,
          borderRadius: 50,
          paddingBottom: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name == 'Home') {
            iconName = !focused
              ? 'home-thermometer-outline'
              : 'home-thermometer';
          } else if (route.name == 'Profile') {
            iconName = !focused ? 'account-edit-outline' : 'account-edit';
          } else if (route.name == 'Orders') {
            iconName = !focused ? 'basket-check-outline' : 'basket-check';
          } else if (route.name == 'Employees') {
            iconName = !focused ? 'account-group-outline' : 'account-group';
          } else if (route.name == 'Stat') {
            iconName = !focused ? 'chart-line' : 'chart-line-stacked';
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
      <TabStack.Screen name="Orders" component={Order} />
      <TabStack.Screen name="Stat" component={Stat} />
      <TabStack.Screen name="Employees" component={Employee} />
      <TabStack.Screen name="Profile" component={Profile} />
    </TabStack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerActiveTintColor:primaryColor,
        headerShown: false,
        drawerIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name == 'Tabs') {
            iconName = 'home-group'
          }
            return (
              <MaterialCommunityIcons
                name={'home-group'}
                size={size}
                color={color}
              />
            );

        },
      })}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeTabs" component={BottomTabStack} />
      <Drawer.Screen name="Test" component={Test} />
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
      <Stack.Navigator
        screenOptions={{
          animation:'fade_from_bottom',
          headerShown: false,
        }}

        initialRouteName="HomeStack">
        <Stack.Screen component={LoginStack} name="Login" />
        <Stack.Screen component={HomeStack} name="HomeStack" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
