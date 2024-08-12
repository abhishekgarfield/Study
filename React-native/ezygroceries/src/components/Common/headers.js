import {
  Animated,
  Easing,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AntDesign, Ionicons} from '../../assets/icons';
import {Title, smallTitles} from '../../assets/fonts';
import {mainHeaderStyles} from '../../styles/mainHeaderStyles';
import {TabRouter, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useRef} from 'react';

const MainHeader = () => {
  const headerAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const route = useRoute()
  const user = {
    image: require('../../assets/images/sampDp2.jpg'),
    first_name: 'Abhishek',
    last_name: 'garfield',
    user_name: 'garfield1859',
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
        ...mainHeaderStyles.topView,
        transform: [
          {
            scale: headerAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      }}>
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
        <View style={{paddingRight: 5}}>
          <AntDesign name={'search1'} size={25} color={'black'} />
        </View>
        <View>
          <Ionicons name={'notifications-outline'} size={25} color={'black'} />
        </View>
      </View>
    </Animated.View>
  );
};

export default MainHeader;
