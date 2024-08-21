import PortalChoiceBackground from './portalChoiceBackground';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {getShop} from '../../apis/api';
import {Text, View, Animated, Easing} from 'react-native';
import {dispMessage} from '../Common/flashMessages';
import { notApprovedStyles } from '../../styles/notApprovedStyles';

const NotApproved = ({navigation, route}) => {
  const cardAnimRef = useRef(new Animated.Value(0)).current;
  const {shop_id} = route.params;
  const [shop, setshopData] = useState({
    id: 1,
    name: 'kariyana',
    web_url: 'www.google.com',
    is_verified: 1,
    gst_no: '123456',
    description: 'Starting new in ezyfroceries',
  });

  const focus = () => {
    cardAnimRef.setValue(-1);
    Animated.timing(cardAnimRef, {
      easing: Easing.ease,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  useEffect(() => {
    navigation.addListener('focus', focus);
  });
  useEffect(() => {
    dispMessage('danger', 'Error', route.params.message);
    axios
      .post(
        getShop,
        {
          shop_id: shop_id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(res => {
        setshopData(res.data);
      });
  }, []);
  return (
    <PortalChoiceBackground hide={true}>
      <Animated.View
        style={{
          ...notApprovedStyles.topView,
          transform: [
            {
              scale: cardAnimRef.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              }),
            },
          ],
        }}>
        <View style={notApprovedStyles.innerContainer}>
          <Text style={notApprovedStyles.label}>Name</Text>
          <Text style={notApprovedStyles.textStyle}>{shop.name}</Text>
        </View>
        <View style={notApprovedStyles.innerContainer}>
          <Text style={notApprovedStyles.label}>Description</Text>
          <Text style={notApprovedStyles.textStyle}>{shop.description}</Text>
        </View>
        <View style={notApprovedStyles.innerContainer}>
          <Text style={notApprovedStyles.label}>Website</Text>
          <Text style={notApprovedStyles.textStyle}>{shop.web_url}</Text>
        </View>
        <View style={notApprovedStyles.innerContainer}>
          <Text style={{...notApprovedStyles.textStyle, fontSize: 10, paddingTop: 10}}>
            Please ask shop owner to approve your account.
          </Text>
        </View>
      </Animated.View>
    </PortalChoiceBackground>
  );
};

export default NotApproved;


