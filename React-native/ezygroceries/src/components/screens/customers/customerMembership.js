import {
  Animated,
  Easing,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext, useEffect, useRef, useState} from 'react';
import {
  black,
  fadedBlack,
  lightGreen,
  paleGreen,
  powderBlue,
  white,
} from '../../Common/colors.js';
import {text, Title} from '../../../assets/fonts.js';
import {DataContext} from '../../../../store.js';
import axios from 'axios';
import Animated2, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {getAvailableShops, getcustomerMembershipData} from '../../../apis/api.js';
import MainHeader from '../../Common/headers.js';
import {AntDesign} from '../../../assets/icons.js';
import ItemSkeletonLoader from '../../Common/skeletonLoader.js';
import { useNavigation } from '@react-navigation/native';

const MembershipItems = ({item, is_subscribed}) => {
  const navigation = useNavigation();
  const scale = useSharedValue(0.8);
  const [loading, setLoading] = useState(true);
  const {name, total_amount, pic_url, description} = item.item;
  useEffect(() => {
    scale.value = withSpring(1, {damping: 2, stiffness: 100});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  return (
    <Animated2.View
      style={[
        {
          flex: 1,
          marginBottom: 6,
          borderRadius: 10,
          height: 90,
          overflow: 'hidden',
          justifyContent: 'center',
          backgroundColor: item.index % 2 == 0 ? powderBlue : paleGreen,
        },
        animatedStyle,
      ]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('shopScreen',{
            shop: item.item,
            is_subscribed: is_subscribed
          })
        }}>
        <View style={{display: 'flex'}}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={{flexBasis: '20%', marginRight: 10}}>
              <Image
                onLoad={() => {
                  setLoading(false);
                }}
                resizeMethod="resize"
                style={{height: '100%', width: '100%', borderRadius: 10}}
                resizeMode="cover"
                source={
                  !loading
                    ? {uri: pic_url}
                    : require('../../../assets/images/Balll.gif')
                }
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                flexWrap: 'wrap',
                overflow: 'hidden',
                flexDirection: 'column',
                flexBasis: '50%',
                flexGrow: 1,
              }}>
              <Text
                style={{fontFamily: Title, width: '100%', fontWeight: '500'}}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: text,
                    fontSize: 12,
                    fontWeight: '400',
                    color: fadedBlack,
                  }}>
                  {total_amount} /-
                </Text>

              </View>
              <Text
                  style={{
                    fontFamily: text,
                    fontSize: 12,
                    fontWeight: '400',
                    width: '100%',
                    color: fadedBlack,
                  }}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {description}
                </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated2.View>
  );
};

const CusMemberShip = ({navigation}) => {
  const dataContext = useContext(DataContext);
  const [membershipLoader, setmembershipLoader] = useState(true);
  const [allShopsLoader, setallShopsLoader] = useState(true);
  const [allShops, setallShops] = useState([]);

  const {id, auth_token} = dataContext.currentUser;
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed2, setCollapsed2] = useState(false);
  const [membershipData, setMembershipData] = useState([]);
  const animatedValue1 = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;

  const toggleCollapse1 = () => {
    Animated.timing(animatedValue1, {
      toValue: collapsed ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setCollapsed(!collapsed);
  };

  const toggleCollapse2 = () => {
    Animated.timing(animatedValue2, {
      toValue: collapsed2 ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
    setCollapsed2(!collapsed2);
  };

  const animatedStyle1 = {
    flex: animatedValue1.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    overflow: 'hidden',
  };

  const animatedStyle2 = {
    flex: animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    overflow: 'hidden',
  };

  const fetchMmbershipData = () => {
    setmembershipLoader(true);
    axios
      .get(`${getcustomerMembershipData}?user_id=${id}`, {
        headers: {
          ezyGroceries_header_key: auth_token,
        },
      })
      .then(res => {
        setMembershipData(res.data);
        setmembershipLoader(false);
      })
      .catch(err => {
        if (err.response.status == 401) {
          dispMessage(err.response.data);
        }
        setmembershipLoader(false);
        console.log('----errr---', err.response.data);
      });
  };

  const fetchAllShops = () => {
    setallShopsLoader(true)
    axios
      .get(`${getAvailableShops}?user_id=${id}`, {
        headers: {
          ezyGroceries_header_key: auth_token,
        },
      })
      .then(res => {
        console.log('----res--111111--', res.data);
        setallShops(res.data)
        setallShopsLoader(false)

      })
      .catch(err => {
        if (err.response.status == 401) {
          dispMessage(err.response.data);
        }
        setallShopsLoader(false)

        console.log('----errr---', err.response.data);
      });
  };
  const onFocus = () => {
    fetchMmbershipData();
    fetchAllShops();
  };



  useEffect(() => {
    const unsubscribeNavigation = navigation.addListener('focus', onFocus);
    return unsubscribeNavigation;
  }, []);
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <MainHeader
      />
      <View style={{flex: 1, flexDirection: 'column', paddingHorizontal: 17}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleCollapse1}
          style={{
            backgroundColor: lightGreen,
            paddingVertical: 12,
            borderRadius: 4,
            borderBottomColor: 'transparent',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            shadowColor: black,
            shadowOffset: {height: 2, width: 1},
            shadowRadius: 2,
            shadowOpacity: 1,
          }}>
          <Text style={{fontFamily: Title, fontSize: 15, fontWeight: '600'}}>
            MemberShips
          </Text>
          {collapsed ? (
            <AntDesign color={black} size={20} name={'down'} />
          ) : (
            <AntDesign color={black} size={20} name={'up'} />
          )}
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              backgroundColor: white,
              shadowColor: black,
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 2,
              shadowOpacity: 1,
              marginBottom: 10,
            },
            animatedStyle1,
          ]}>
          {!collapsed && (
            <View>
              {membershipLoader ? (
                <ItemSkeletonLoader />
              ) : (
                <FlatList
                  style={{marginVertical: 3}}
                  contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                  renderItem={item => {
                    return <MembershipItems item={item} is_subscribed={true}/>;
                  }}
                  keyExtractor={item => item.id}
                  data={membershipData}
                />
              )}
            </View>
          )}
        </Animated.View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleCollapse2}
          style={{
            backgroundColor: lightGreen,
            paddingVertical: 12,
            borderRadius: 4,
            borderBottomColor: 'transparent',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            shadowColor: black,
            shadowOffset: {height: 2, width: 0},
            shadowRadius: 2,
            shadowOpacity: 1,
          }}>
          <Text style={{fontFamily: Title, fontSize: 15, fontWeight: '600'}}>
            All shops
          </Text>
          {collapsed2 ? (
            <AntDesign color={black} size={20} name={'down'} />
          ) : (
            <AntDesign color={black} size={20} name={'up'} />
          )}
        </TouchableOpacity>
        <Animated.View
          style={[
            {
              backgroundColor: white,
              shadowColor: black,
              shadowOffset: {height: 2, width: 2},
              shadowRadius: 2,
              shadowOpacity: 1,
              marginBottom: 10,
            },
            animatedStyle2,
          ]}>
            {!collapsed2 && (
            <View>
              {allShopsLoader ? (
                <ItemSkeletonLoader />
              ) : (
                <FlatList
                  style={{marginVertical: 3}}
                  contentContainerStyle={{
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}
                  renderItem={item => {
                    return <MembershipItems item={item} is_subscribed={false}/>;
                  }}
                  keyExtractor={item => item.id}
                  data={allShops}
                />
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default CusMemberShip;
