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
import MainHeader from '../../../Common/headers';
import {useContext, useEffect, useRef, useState} from 'react';
import {AntDesign} from '../../../../assets/icons';
import {
  black,
  fadedBlack,
  lightGreen,
  paleGreen,
  powderBlue,
  white,
} from '../../../Common/colors';
import {text, Title} from '../../../../assets/fonts';
import {getShopMembershipData, headers} from '../../../../apis/api';
import {DataContext} from '../../../../../store';
import axios from 'axios';
import ItemSkeletonLoader from '../../../Common/skeletonLoader';
import Animated2, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AddMembershipModal from './AddMembershipModal.js';

const MembershipItems = ({item}) => {
  console.log('----111----', item.item.item);
  const scale = useSharedValue(0.8);
  const [loading, setLoading] = useState(true);
  const {first_name, total_amount, profile_pic} = item.item;
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
          setModalVisibleData({
            active: true,
            item: item.item,
          });
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
                    ? {uri: profile_pic}
                    : require('../../../../assets/images/Balll.gif')
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
                {first_name}
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated2.View>
  );
};

const MemberShip = ({navigation}) => {
  const dataContext = useContext(DataContext);
  const [membershipLoader, setmembershipLoader] = useState(true);
  console.log('-------------------1111---------', dataContext.currentUser);
  const {user_id, shop_id, auth_token} = dataContext.currentUser;
  const [collapsed, setCollapsed] = useState(false);
  const [addMembershipModal, setAddMembershipModal] = useState(false);
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
      .get(`${getShopMembershipData}?shop_id=${shop_id}`, {
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

  const fetchOrdersData = () => {
    axios
      .get(`${getShopMembershipData}?shop_id=${shop_id}`, {
        headers: {
          ezyGroceries_header_key: auth_token,
        },
      })
      .then(res => {
        console.log('----res----', res.data);
        setMembershipData(res.data);
      })
      .catch(err => {
        if (err.response.status == 401) {
          dispMessage(err.response.data);
        }
        console.log('----errr---', err.response.data);
      });
  };
  const onFocus = () => {
    fetchMmbershipData();
    // fetchOrdersData();
  };

  const handleMembershipSave = new_membership => {
    console.log('----------new membership ------', new_membership);
    setMembershipData([...membershipData, new_membership]);
    setAddMembershipModal(!addMembershipModal);
  };

  useEffect(() => {
    const unsubscribeNavigation = navigation.addListener('focus', onFocus);
    return unsubscribeNavigation;
  }, []);
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <MainHeader
        setAddMembershipModal={setAddMembershipModal}
        addMembershipModal={addMembershipModal}
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
                    return <MembershipItems item={item} />;
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
            Orders
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
          {!collapsed2 && <Text>Content for section 2</Text>}
        </Animated.View>
      </View>
      {addMembershipModal && (
        <AddMembershipModal
          addMembershipModal={addMembershipModal}
          setAddMembershipModal={setAddMembershipModal}
          handleMembershipSave={handleMembershipSave}
        />
      )}
    </SafeAreaView>
  );
};

export default MemberShip;
