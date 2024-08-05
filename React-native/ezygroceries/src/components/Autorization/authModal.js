import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import PortalChoiceBackground from './portalChoiceBackground';
import DateTimePicker from '@react-native-community/datetimepicker';

import {logo2} from '../../assets/images';
import {useEffect, useState} from 'react';
import {
  errorColor,
  linkColor,
  primaryColor,
  secondaryColor,
} from '../Common/colors';
import {Title, text} from '../../assets/fonts';
import {dispMessage} from '../Common/flashMessages';
const AuthModal = ({route, navigation}) => {
  const [authType, setAuthType] = useState('logIn');
  const {userType} = route.params;
  console.log('---usertpe----', userType);
  // let userType = 'shopper'
  const [error, setError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob: new Date(),
  });
  const handleInput = (name, value) => {
    if (name == 'dob') {
      setShowDate(!showDate);
    }
    setUser({...user, [name]: value});
  };
  const validateUser = () => {
    const {name, email, password, confirmPassword, phone} = user;
    if (authType == 'logIn') {
      if (!(email && password)) {
        setError('All fields are required');
      } else {
        setError('');
      }
      navigation.navigate('otpVerification', {
        user: {
          email: 'abhishek2759@gmail.com',
        },
      });
    } else {
      if (!(name && email && password && confirmPassword && phone)) {
        setError('All fields are required');
        dispMessage('danger', 'Error', 'All fields are required');
      } else if (!/^([0-9]{10})$/.test(phone)) {
        dispMessage('danger', 'Error', 'Phone number is invalid');

        setError('Phone number is invalid');
      } else if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z](?=.*\W).{8,16})/.test(password)
      ) {
        dispMessage(
          'danger',
          'Error',
          'Password should have special charachter, lower, upper, numeric charchters and length should be > 8',
        );
        setError(
          'Password should have special charachter, lower, upper, numeric charchters and length should be > 8',
        );
      } else if (password != confirmPassword) {
        dispMessage('danger', 'Error', "passwords don't match");
        setError("passwords don't match");
      } else {
        setError('');
        console.log('---all errors cleared----');
      }
    }
  };
  useEffect(() => {
    // fetch("http://localhost:3000/api/v1/shops").then(res => res.json()).then((data)=>console.log("---data---",data)).catch(err => console.log(err))
    const backHandle = BackHandler.addEventListener('hardwareBackPress',()=>{
      return false;
    })

    return () => backHandle.remove()
  }, []);
  return (
    <PortalChoiceBackground>
      <View>
        {authType == 'signUp' && (
          <View style={styles.inputContainer}>
            <Icon name="account" size={30} color={'white'} />
            <TextInput
              autoComplete="sms-otp"
              textContentType="oneTimeCode"
              value={user.name}
              placeholderTextColor={'white'}
              style={styles.inputField}
              placeholder={'Name'}
              onChangeText={value => {
                handleInput('name', value);
              }}
            />
          </View>
        )}

        <View style={styles.inputContainer}>
          <Icon name="email" size={30} color={'white'} />
          <TextInput
            value={user.email}
            inputMode="email"
            placeholderTextColor={'white'}
            style={styles.inputField}
            onChangeText={value => {
              handleInput('email', value);
            }}
            placeholder="Email"
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="onepassword" size={30} color={'white'} />
          <TextInput
            value={user.password}
            placeholderTextColor={'white'}
            style={styles.inputField}
            placeholder="Password"
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            onChangeText={value => {
              handleInput('password', value);
            }}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye' : 'eye-off'}
              size={30}
              color={primaryColor}
            />
          </TouchableOpacity>
        </View>
        {authType == 'signUp' && (
          <View>
            <View style={styles.inputContainer}>
              <Icon name="form-textbox-password" size={30} color={'white'} />

              <TextInput
                value={user.confirmPassword}
                placeholderTextColor={'white'}
                style={styles.inputField}
                placeholder="Confirm password"
                secureTextEntry={true}
                onChangeText={value => {
                  handleInput('confirmPassword', value);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={30} color={'white'} />
              <TextInput
                value={user.phone}
                placeholderTextColor={'white'}
                style={styles.inputField}
                inputMode="tel"
                placeholder="Phone no."
                onChangeText={value => {
                  handleInput('phone', value);
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Icon name="calendar" size={30} color={'white'} />
              <Text onPress={() => setShowDate(true)} style={styles.inputField}>
                {user.dob ? user.dob.toDateString() : 'DOB'}
              </Text>
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={user.dob}
                  mode={'date'}
                  display="default"
                  textColor="white"
                  themeVariant="dark"
                  onChange={(event, selectedDate) => {
                    handleInput('dob', selectedDate);
                    console.log('----text-----', selectedDate);
                  }}
                />
              )}
            </View>
          </View>
        )}
        {/* {error && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginBottom: 8,
            }}>
            <Icon2 name="error" size={25} color={errorColor} />
            <Text
              style={{
                color: 'red',
                fontWeight: '500',
                padding: 5,
                fontFamily:text
              }}>
              {error}
            </Text>
          </View>
        )} */}
        <TouchableOpacity
          onPress={() => {
            validateUser();
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: primaryColor,
            paddingVertical: 13,
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
              color: 'white',
              textAlign: 'center',
              fontWeight: '600',
              letterSpacing: 0,
              fontSize: 20,
            }}>
            {authType == 'logIn' ? 'Sign In' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 10,
            padding: 5,
            shadowRadius: 3,
            shadowColor: 'white',
            shadowOpacity: 1,
            shadowOffset: {width: 2, height: -1},
            elevation: 3,
            backgroundColor: '#0000',
            fontFamily: text,
          }}
          onPress={() => {
            setUser({
              name: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
              dob: new Date(),
            });
            setError('');
            setAuthType(authType == 'logIn' ? 'signUp' : 'logIn');
          }}>
          <Text
            style={{
              color: linkColor,
              fontSize: 15,
              fontWeight: '500',
              fontFamily: Title,
              shadowRadius: 3.84,
            shadowColor: 'white',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: 0},
            elevation: 1,
            backgroundColor : "#0000"
            }}>
            {authType == 'logIn'
              ? 'Not registered yet ! sign up ? '
              : 'Already an user ! log in ?'}
          </Text>
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
    fontFamily: text,
  },
  inputContainer: {
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    borderBottomWidth: 1.5,
    marginBottom: 10,
  },
});

export default AuthModal;
