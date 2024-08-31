import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  TextInput,
} from 'react-native';
import {AntDesign, Ionicons, SimpleLineIcons} from '../../assets/icons';
import {Title, smallTitles} from '../../assets/fonts';
import {mainHeaderStyles} from '../../styles/mainHeaderStyles';
import {TabRouter, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef, useState} from 'react';
import {black} from './colors';

const MainHeader = ({setItemModal, itemModal, addItem, setAddMembershipModal, addMembershipModal }) => {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute();
  const user = {
    image: require('../../assets/images/sampDp2.jpg'),
    first_name: 'Abhishek',
    last_name: 'garfield',
    user_name: 'garfield1859',
  };
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const [searchData, setSearchData] = useState({
    is_active: false,
    searcValue: '',
  });
  const startSearchAnim = () => {
    let toValue = searchData.is_active ? 0 : 45;
    Animated.timing(searchAnimation, {
      useNativeDriver: false,
      toValue: toValue,
      easing: Easing.bounce,
    }).start(({finished}) => {
      setSearchData({...searchData, is_active: !searchData.is_active});
    });
  };

  const onFocus = () => {
    headerAnim.setValue(0);
    Animated.spring(headerAnim, {
      useNativeDriver: true,
      toValue: 1,
      delay: route.name == 'Home' && 100,
    }).start();
  };
  useEffect(() => {
    const unsubNavigation = navigation.addListener('focus', onFocus);
    return unsubNavigation;
  }, []);
  return (
    <Animated.View
      style={{
        paddingHorizontal: 17,
        marginBottom: 7,
        transform: [
          {
            scale: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      }}>
      <View style={mainHeaderStyles.topView}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.toggleDrawer();
          }}>
          <Image style={mainHeaderStyles.personDp} source={user.image} />
        </TouchableWithoutFeedback>
        <View style={mainHeaderStyles.headerTextContainer}>
          <Text style={mainHeaderStyles.greetinText}>
            Hello, {user.first_name}
          </Text>
          <Text style={mainHeaderStyles.dateText}>
            Today {new Date().toDateString()}
          </Text>
        </View>
        <View style={mainHeaderStyles.iconContainer}>
          {
            route.name == 'Orders' &&
            <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => {
              setAddMembershipModal(!addMembershipModal)
            }}>
            <AntDesign name={'adduser'} size={25} color={'black'} />
          </TouchableOpacity>
          }
          {
            addItem &&
            <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() => {
              setItemModal({...itemModal,['active']: !itemModal.active})
            }}>
            <AntDesign name={'addfile'} size={25} color={'black'} />
          </TouchableOpacity>
          }
          <View style={{paddingRight: 5}}>
            <TouchableOpacity
              style={{paddingRight: 5}}
              onPress={() => {
                startSearchAnim();
              }}>
              <SimpleLineIcons
                name={searchData.is_active ? 'magnifier-remove' : 'magnifier'}
                size={25}
                color={'black'}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Ionicons
              name={'notifications-outline'}
              size={25}
              color={'black'}
            />
          </View>
        </View>
      </View>
      <Animated.View
        style={[
          mainHeaderStyles.searchBarTopContainer,
          {height: searchAnimation},
        ]}>
        <View style={mainHeaderStyles.searchbarInnerContainer}>
          <TextInput
            value={searchData.searcValue}
            onChangeText={text => {
              setSearchData({...searchData, searcValue: text});
            }}
            placeholder="Search items"
            style={mainHeaderStyles.textInputStyles}
            placeholderTextColor={'grey'}
          />
          <TouchableOpacity
            onPress={() => {
              setSearchData({...searchData, searcValue: ''});
            }}>
            <AntDesign name={'closecircle'} size={20} color={'grey'} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default MainHeader;
