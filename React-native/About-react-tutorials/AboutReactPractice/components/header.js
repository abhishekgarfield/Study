import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  TextInput,
  SafeAreaView,
} from 'react-native';

const Header = () => {
  const [inputValue, setInputValue] = useState('');
  const nav = useNavigation()

  return (
    <SafeAreaView style={{backgroundColor:'black'}}>
      <View
        style={{
          margin: 5,
          marginHorizontal: 10,
          borderColor: 'black',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            console.log('---- hello ---');
            // navigation.openDrawer();
            nav.openDrawer();
          }}>
          <Image
            style={{height: 25, width: 25}}
            resizeMode="stretch"
            src="https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png"
          />
        </TouchableOpacity>
        <TextInput
          editable={true}
          placeholder="Enter your name here"
          style={{padding: 10, backgroundColor: 'white', flexGrow: 1}}
          placeholderTextColor={'grey'}
          onChangeText={text => {
            setInputValue(text);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Header;
