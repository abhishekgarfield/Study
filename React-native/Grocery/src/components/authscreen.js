import {
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {authScreenStyles} from '../styles/authScreenStyles';
const imge = require('../assets/images/authScreenImages/login.jpeg');
const AuthScreen = () => {
  return (
    <View style={authScreenStyles.firstContainer}>
      <ImageBackground
        resizeMode="cover"
        style={{
          display: 'flex',
          flex: 0.45,
          height: '135%',
          width: '133%',
          transform: [{rotate: '210deg'}],
        }}
        source={imge}
      />
      <View
        style={{
          backgroundColor: 'yellow',
          flex: 0.55,
          flexDirection: 'column',
        }}>
        <Text style={{fontWeight: '600', fontSize: 25, letterSpacing: 1}}>
          Get your groceries {`\n`}with avani
        </Text>
        <TextInput
          inputMode="numeric"
          style={{display: 'flex'}}
          placeholder="Number"
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#5383EC',
            padding: 15,
            borderRadius: 10,
            marginHorizontal: 15,
          }}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: '400'}}>
          Continue with google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>continue with facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthScreen;
