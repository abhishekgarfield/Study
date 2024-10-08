import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useEffect, useRef, useState} from 'react';
import MainHeader from '../../Common/headers';
import { quoteColor } from '../../Common/colors';
import { Title,highlightSmallTitles, italicLight } from '../../../assets/fonts';

const CustomerHome = ({navigation}) => {
  const quoteAnimation = useRef(new Animated.Value(0)).current;

  const user = {
    image: require('../../../assets/images/sampDp2.jpg'),
    first_name: 'Abhishek',
    last_name: 'garfield',
    user_name: 'garfield1859',
  };

  const onFocus = () => {
    quoteAnimation.setValue(0);
    Animated.spring(quoteAnimation, {
      useNativeDriver: true,
      toValue: 1,
      delay: 100,
    }).start(({finished}) => {
      if (finished) {
        console.log('---fisnis', finished, quoteAnimation.current);
      }
    });
  };
  useEffect(() => {
    const unsubscribeNavigation = navigation.addListener('focus', onFocus);
    return unsubscribeNavigation;
  }, []);
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <MainHeader />
      <ScrollView
        style={{marginHorizontal: 17, paddingTop: 22}}
        contentContainerStyle={{}}>
        <Animated.View
          style={{
            transform: [
              {
                scale: quoteAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
            backgroundColor: quoteColor,
            height: 150,
            borderRadius: 25,
            flexDirection: 'row',
            overflow: 'visible',
          }}>
          <View
            style={{
              flexDirection: 'column',
              flexBasis: '80%',
              flexGrow: 1,
              padding: 10,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}>
            <Text style={{fontFamily: Title, fontSize: 28, letterSpacing: -1}}>
              Daily quote
            </Text>
            <Text
              style={{
                fontFamily: highlightSmallTitles,
                fontWeight: '400',
                paddingVertical: 6,
              }}>
              An apple a day, keeps the doctor away !
            </Text>
            <Text
              style={{
                fontFamily: italicLight,
                fontWeight: '300',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                paddingRight: 10,
              }}>
              - garfield
            </Text>
          </View>
          <Image
            source={require('../../../assets/images/pngegg.png')}
            resizeMode="contain"
            style={{
              height: 180,
              flexBasis: '30%',
              position: 'relative',
              top: -30,
              left: -40,
            }}
            height={10}
            width={10}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerHome;
