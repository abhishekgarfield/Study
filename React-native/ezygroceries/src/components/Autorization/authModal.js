import {TextInput, View, StyleSheet,Text, Image,TouchableOpacity} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';

import { logo } from '../../assets/images';
const AuthModal = () => {
  return (
    <PortalChoiceBackground>
      <View>
        <View
          style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height:44,display:'flex',flexBasis:'10%'}}
            resizeMode='contain'
          />
          <TextInput keyboardType='default' placeholderTextColor={'white'} style={styles.inputField} placeholder='Email' />
        </View>
        <View
          style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height:44,display:'flex',flexBasis:'10%'}}
            resizeMode='contain'
          />
          <TextInput placeholderTextColor={'white'} style={styles.inputField} placeholder='Password' />
        </View>
        <View
          style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height:44,display:'flex',flexBasis:'10%'}}
            resizeMode='contain'
          />
          <TextInput placeholderTextColor={'white'} style={styles.inputField} placeholder='Confirm password' />
        </View>
        <View
          style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height:44,display:'flex',flexBasis:'10%'}}
            resizeMode='contain'
          />
          <TextInput placeholderTextColor={'white'} style={styles.inputField} placeholder='Phone no.' />
        </View><View
          style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height:44,display:'flex',flexBasis:'10%'}}
            resizeMode='contain'
          />
          <TextInput placeholderTextColor={'white'} style={styles.inputField} placeholder='Email' />
        </View>
        <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'rgba(48,177,255,1)',
          paddingVertical: 12,
          borderWidth:0,
          alignItems:'center',
          borderColor:'black',
          paddingHorizontal: 40,
          justifyContent: 'center',
          borderRadius: 5,
          margin: 0,
          marginTop: 0,
          shadowRadius:3.84,
          shadowColor:'#000',
          shadowOpacity:1,
          shadowOffset:{width:0,height:2},
          elevation:4,
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 0,
            fontSize: 20,
          }}>
          Sign In
        </Text>
      </TouchableOpacity>
      </View>
    </PortalChoiceBackground>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flexGrow:1,
    borderColor: 'black',
    paddingHorizontal: 10,
    color:'white',
    fontSize:20,
    fontWeight:'500'
  },
  inputContainer:{
    display: 'flex',
            justifyContent: 'flex-start',
            height: 55,
            flexDirection: 'row',
            alignItems:'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding:10,
            borderBottomWidth: 3,
            marginBottom:10
  }
});

export default AuthModal;


