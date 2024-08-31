import PortalChoice from './src/components/Autorization/PortalChoice';
import AuthModal from './src/components/Autorization/authModal';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpVerification from './src/components/Autorization/otpVerification';
import Home from './src/components/screens/employees/Homescreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Test from './src/components/screens/employees/testscreen';
import {Image, Linking, Text, View, ViewBase} from 'react-native';
import rootStyles, {drawerStyles} from './src/styles/rootStyles';
import {MaterialCommunityIcons} from './src/assets/icons';
import {black, primaryColor} from './src/components/Common/colors';
import Profile from './src/components/screens/employees/profilescreen';
import Employee from './src/components/screens/employees/employeescreen';
import NotApproved from './src/components/Autorization/notApproved';
import {useContext, useLayoutEffect} from 'react';
import {DataContext} from './store';
import {deleteTable, selectRecord} from './src/config/sqlite';
import tables from './src/helpers/tables';
import SplashScreen from 'react-native-splash-screen';
import ShopItems from './src/components/screens/employees/shopitems';
import { navigationRef } from './src/helpers/navigation';
import MemberShip from './src/components/screens/employees/memberships/membership';
import CustomerHome from './src/components/screens/customers/customerHome';
import CusMemberShip from './src/components/screens/customers/customerMembership';
import Shopscreen from './src/components/screens/customers/shopScreen';
import Basketscreen from './src/components/screens/customers/basketScreen';


const Stack = createNativeStackNavigator();
const TabStack = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const dataContext = useContext(DataContext)
  return (
    <DrawerContentScrollView {...props}>
      <View style={drawerStyles.header}>
        <View style={drawerStyles.profileCircle}>
          {false ? (
            <Text style={drawerStyles.profileText}>f</Text>
          ) : (
            <Image
              style={drawerStyles.profilePhoto}
              source={require('./src/assets/images/sampDp2.jpg')}
            />
          )}
        </View>
        <Text style={drawerStyles.text}>{dataContext.currentUser.first_name}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor={primaryColor}
        label={'Help'}
        icon={({color, focused, size}) => {
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
      <DrawerItem
        activeTintColor={primaryColor}
        label={'Log out'}
        icon={({color, focused, size}) => {
          return (
            <MaterialCommunityIcons
              name={'logout'}
              size={size}
              color={color}
            />
          );
        }}
        onPress={() => {
          deleteTable(tables.UserTable).then((res)=>{
              dataContext.setCurrentUser({});

          })
        }}
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
  const dataContext = useContext(DataContext)
  return (
    dataContext.currentUser.is_employee ? <TabStack.Navigator
    screenOptions={({route}) => ({
      tabBarActiveTintColor: primaryColor,
      tabBarInactiveTintColor: 'white',
      headerShown: false,
      tabBarStyle: {
        height: 75,
        backgroundColor: black,
        marginBottom: 9,
        marginHorizontal: 17,
        marginTop: 5,
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
        } else if (route.name == 'Shopitems') {
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
    <TabStack.Screen name="Orders" component={MemberShip} />
    <TabStack.Screen name="Shopitems" component={ShopItems} />
    <TabStack.Screen name="Employees" component={Employee} />
    <TabStack.Screen name="Profile" component={Profile} />
  </TabStack.Navigator> : <TabStack.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: {
          height: 75,
          backgroundColor: black,
          marginBottom: 9,
          marginHorizontal: 17,
          marginTop: 5,
          borderRadius: 50,
          paddingBottom: 0,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name == 'CustomerHome') {
            iconName = !focused
              ? 'home-thermometer-outline'
              : 'home-thermometer';
          } else if (route.name == 'Profile') {
            iconName = !focused ? 'account-edit-outline' : 'account-edit';
          } else if (route.name == 'CustomerOrders') {
            iconName = !focused ? 'basket-check-outline' : 'basket-check';
          } else if (route.name == 'Employees') {
            iconName = !focused ? 'account-group-outline' : 'account-group';
          } else if (route.name == 'Shopitems') {
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
      <TabStack.Screen name="CustomerHome" component={CustomerHome} />
      <TabStack.Screen name="CustomerOrders" component={CustmembersipStack} />
      <TabStack.Screen name="Shopitems" component={ShopItems} />
      <TabStack.Screen name="Employees" component={Employee} />
      <TabStack.Screen name="Profile" component={Profile} />
    </TabStack.Navigator>
  );
};

const CustmembersipStack = () => {
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name='allShopData' component={CusMemberShip}/>
      <Stack.Screen name='shopScreen' component={Shopscreen}/>
      <Stack.Screen name='basketScreen' component={Basketscreen} options={{presentation:'modal'}}/>
    </Stack.Navigator>
  )
}

const HomeStack = () => {
  return (
    <Drawer.Navigator
      screenOptions={({route}) => ({
        drawerActiveTintColor: primaryColor,
        headerShown: false,
        drawerIcon: ({focused, color, size}) => {
          let iconName = '';
          if (route.name == 'Tabs') {
            iconName = 'home-group';
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
      <Stack.Screen name={'notApproved'} component={NotApproved}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Root = () => {
  const dataContext = useContext(DataContext);
    useLayoutEffect(()=>{
    selectRecord(tables.UserTable, '*')
      .then(res => {
        console.log("---res---",res.item(0))
        dataContext.setCurrentUser(res.item(0));
        SplashScreen.hide()

      })
      .catch((err) => {
        console.log('----err---', err);
        SplashScreen.hide()
      });
    },[])
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade_from_bottom',
          headerShown: false,
        }}
        initialRouteName="Login">
        {!dataContext.currentUser?.auth_token? (
          <Stack.Screen component={LoginStack} name="Login" />
        ) : (
          <Stack.Screen component={HomeStack} name="HomeStack" dataContext />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Root;
