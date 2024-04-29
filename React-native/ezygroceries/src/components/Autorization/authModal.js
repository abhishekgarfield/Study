import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';

import {logo} from '../../assets/images';
import {useEffect, useState} from 'react';
const AuthModal = ({route}) => {
  const [authType, setAuthType] = useState('signUp');
  const {userType} = route.params;
  const [user, setUser] = useState({
    name:'',
    email:'',
    phone:'',
    password:'',
    confirmPassword:'',
  })
  const validateUser = () => {

  }
  useEffect(() => {
    // setUserType(route.params.userType)
  }, []);
  return (
    <PortalChoiceBackground>
      <View>
        {authType == 'signUp' && (
          <View style={styles.inputContainer}>
            <Image
              source={logo}
              style={{height: 44, display: 'flex', flexBasis: '10%'}}
              resizeMode="contain"
            />
            <TextInput
              value={user.name}
              keyboardType="default"
              placeholderTextColor={'white'}
              style={styles.inputField}
              placeholder={'Name'}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height: 44, display: 'flex', flexBasis: '10%'}}
            resizeMode="contain"
          />
          <TextInput
            value={user.email}
            placeholderTextColor={'white'}
            style={styles.inputField}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Image
            source={logo}
            style={{height: 44, display: 'flex', flexBasis: '10%'}}
            resizeMode="contain"
          />
          <TextInput
            value={user.password}
            placeholderTextColor={'white'}
            style={styles.inputField}
            placeholder="Password"
          />
        </View>
        {authType == 'signUp' && (
          <View>
            <View style={styles.inputContainer}>
              <Image
                source={logo}
                style={{height: 44, display: 'flex', flexBasis: '10%'}}
                resizeMode="contain"
              />

              <TextInput
                value={user.confirmPassword}
                placeholderTextColor={'white'}
                style={styles.inputField}
                placeholder="Confirm password"
              />
            </View>
            <View style={styles.inputContainer}>
              <Image
                source={logo}
                style={{height: 44, display: 'flex', flexBasis: '10%'}}
                resizeMode="contain"
              />
              <TextInput
                value={user.phone}
                placeholderTextColor={'white'}
                style={styles.inputField}
                placeholder="Phone no."
              />
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={()=>{
            validateUser()
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: 'rgba(48,177,255,1)',
            paddingVertical: 12,
            borderWidth: 0,
            alignItems: 'center',
            borderColor: 'black',
            paddingHorizontal: 40,
            justifyContent: 'center',
            borderRadius: 5,
            margin: 0,
            marginTop: 0,
            shadowRadius: 3.84,
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 2},
            elevation: 4,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontWeight: '600',
              letterSpacing: 0,
              fontSize: 20,
            }}>
            {authType == 'logIn' ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={{marginTop:10,padding:5}}
          onPress={()=>{
            setAuthType(authType == 'logIn' ? 'signUp' : 'logIn')
          }}>
          <Text style={{color:'rgba(48,120,255,1)',fontSize:15,fontWeight:'600'}}>{authType == 'logIn' ? 'Not registered yet ! sign up ? ' : 'Already an user ! log in ?'}</Text>
        </TouchableOpacity>
      </View>
    </PortalChoiceBackground>
  );
};

const styles = StyleSheet.create({
  inputField: {
    flexGrow: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
});

export default AuthModal;
