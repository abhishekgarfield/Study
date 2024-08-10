import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {AntDesign, Ionicons} from '../../assets/icons';
import {Title, smallTitles} from '../../assets/fonts';
import {mainHeaderStyles} from '../../styles/mainHeaderStyles';
import {useNavigation} from '@react-navigation/native';

const MainHeader = () => {
  const navigation = useNavigation();
  const user = {
    image: require('../../assets/images/sampDp2.jpg'),
    first_name: 'Abhishek',
    last_name: 'garfield',
    user_name: 'garfield1859',
  };
  return (
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
        <View style={{paddingRight: 5}}>
          <AntDesign name={'search1'} size={25} color={'black'} />
        </View>
        <View>
          <Ionicons name={'notifications-outline'} size={25} color={'black'} />
        </View>
      </View>
    </View>
  );
};


export default MainHeader;
