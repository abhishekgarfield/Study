import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  Switch,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MainHeader from '../../Common/headers';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import {useContext, useEffect, useRef, useState} from 'react';
import {DataContext, contextInstance} from '../../../../store';
import axios from 'axios';
import {getShopItems, updateItemAvailability} from '../../../apis/api';
import {dispMessage} from '../../Common/flashMessages';
import {fadedBlack, paleGreen, powderBlue, white} from '../../Common/colors';

import Animated2, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {RectButton} from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '../../../assets/icons';
import {Title, text} from '../../../assets/fonts';
import LoaderKit from 'react-native-loader-kit';
import ItemSkeletonLoader from '../../Common/skeletonLoader';
import ItemFormModal from './ItemFormModal';
import ViewItemModal from './ViewItemModal';

const LeftActions = ({progress, dragX, swipeRowRef, sendDataEdit}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
    };
  });

  return (
    <Animated2.View style={[{flex: 0.4, flexDirection: 'row'}, animatedStyle]}>
      <RectButton
        style={{
          flex: 1,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          swipeRowRef.current.close();
          sendDataEdit();
        }}>
        <MaterialCommunityIcons
          name={'application-edit'}
          size={20}
          color={white}
        />
        <Animated2.Text
          style={{color: white, fontFamily: text, fontWeight: '600'}}>
          Edit
        </Animated2.Text>
      </RectButton>
      <RectButton
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onPress={() => {
          swipeRowRef.current.close();
        }}>
        <MaterialCommunityIcons name={'delete'} size={22} color={white} />
        <Animated2.Text
          style={{color: white, fontFamily: text, fontWeight: '600'}}>
          Delete
        </Animated2.Text>
      </RectButton>
    </Animated2.View>
  );
};

const _renderLeftActions = (
  _progress,
  transalation,
  swipeRowRef,
  sendDataEdit,
) => (
  <LeftActions
    dragX={transalation}
    progress={_progress}
    swipeRowRef={swipeRowRef}
    sendDataEdit={sendDataEdit}
  />
);

const ShopItem = ({item, toggleSwitch, setItemModal, setModalVisibleData}) => {
  const scale = useSharedValue(0.8);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    scale.value = withSpring(1, {damping: 2, stiffness: 100});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const sendDataEdit = () => {
    setItemModal({active: true, is_edit: true, item: item.item});
  };

  const swipeRowRef = useRef(null);
  const {
    id,
    image_urls,
    brand_name,
    description,
    is_available,
    name,
    price,
    quantity,
  } = item.item;
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
      <Swipeable
        childrenContainerStyle={{
          overflow: 'hidden',
          backgroundColor: item.index % 2 == 0 ? powderBlue : paleGreen,
        }}
        ref={swipeRowRef}
        friction={2}
        rightThreshold={200}
        dragOffsetFromRightEdge={40}
        renderLeftActions={(_, progress) => {
          return _renderLeftActions(_, progress, swipeRowRef, sendDataEdit);
        }}>
        <TouchableOpacity
        activeOpacity={1}
          onPress={() => {
            console.log('----item.item', item.item);
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
                      ? {uri: image_urls[0]}
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
                  {name} ({brand_name})
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: text,
                      fontSize: 12,
                      fontWeight: '400',
                      color: fadedBlack,
                    }}>
                    {quantity}{' '}
                  </Text>
                  <Text
                    style={{
                      fontFamily: text,
                      fontSize: 12,
                      fontWeight: '400',
                      color: fadedBlack,
                    }}>
                    | {price}/-
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
              <View
                style={{
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  overflow: 'hidden',
                  marginLeft: 10,
                  alignItems: 'center',
                }}>
                <Switch
                  trackColor={{false: '#767577', true: '#4CAF50'}}
                  thumbColor={is_available ? '#FFFFFF' : '#FFFFFF'}
                  onValueChange={value => {
                    toggleSwitch(id, value);
                  }}
                  value={
                    is_available == 1 || is_available == true ? true : false
                  }
                />
                <Text
                  style={{
                    color: is_available ? 'green' : 'red',
                    fontSize: 10,
                    fontWeight: '400',
                    marginTop: 0,
                  }}>
                  {is_available ? 'Available' : 'Unavailable'}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </Animated2.View>
  );
};

const ShopItems = ({navigation}) => {
  const dataContext = useContext(DataContext);
  const {auth_token, shop_id} = dataContext.currentUser;
  const [shopitems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemModal, setItemModal] = useState({
    active: false,
    is_edit: false,
    item: {},
  });
  const [modalVisibleData, setModalVisibleData] = useState({
    active: false,
    item: {},
  });

  const toggleSwitch = (id, value) => {
    axios
      .post(
        updateItemAvailability,
        {
          item_id: id,
          is_available: value,
        },
        {
          headers: {
            ezyGroceries_header_key: auth_token,
          },
        },
      )
      .then(res => {
        if (res.status == 200) {
          dispMessage('success', 'Success', res.data);
          test = shopitems.map(item => {
            if (item.id == id) {
              item.is_available = value;
              return item;
            }
            return item;
          });
          setShopItems(test);
        }
      })
      .catch(err => {
        dispMessage('danger', 'Error', err.response.data);
      });
  };

  const fetchShopItems = () => {
    setLoading(true);
    axios
      .get(`${getShopItems}?shop_id=${shop_id}`, {
        headers: {
          ezyGroceries_header_key: auth_token,
        },
      })
      .then(res => {
        setLoading(false);
        setShopItems(res.data);
      })
      .catch(err => {
        setLoading(false);
        if (err.response.status == 401) {
          dispMessage(err.response.data);
        }
        console.log('----errr---', err.response.data);
      });
  };

  const onFocus = () => {
    fetchShopItems();
  };
  useEffect(() => {
    const unsubscribeNavigation = navigation.addListener('focus', onFocus);
    return unsubscribeNavigation;
  }, []);
  return (
    <SafeAreaView>
      <MainHeader
        addItem={true}
        setItemModal={setItemModal}
        itemModal={itemModal}
      />
      {loading ? (
        <>
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
          <ItemSkeletonLoader />
        </>
      ) : (
        <FlatList
          style={{marginVertical: 3}}
          contentContainerStyle={{paddingHorizontal: 17, paddingBottom: 75}}
          renderItem={item => {
            return (
              <ShopItem
                item={item}
                toggleSwitch={toggleSwitch}
                setItemModal={setItemModal}
                setModalVisibleData={setModalVisibleData}
              />
            );
          }}
          keyExtractor={item => item.id}
          data={shopitems}
        />
      )}
      {itemModal.active && (
        <ItemFormModal itemModal={itemModal} setItemModal={setItemModal} />
      )}
      {modalVisibleData.active && (
        <ViewItemModal
          modalVisibleData={modalVisibleData}
          setModalVisibleData={setModalVisibleData}
        />
      )}
    </SafeAreaView>
  );
};

export default ShopItems;
