import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import PortalChoiceBackground from './portalChoiceBackground';
import DateTimePicker from '@react-native-community/datetimepicker';

import {logo} from '../../assets/images';
import {useEffect, useState} from 'react';
import {appBasicColor} from '../Common/colors';
const AuthModal = ({route}) => {
  const [authType, setAuthType] = useState('signUp');
  const {userType} = route.params;
  const [error, setError] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dob:new Date()
  });
  const handleInput = (name, value) => {
    setUser({...user, [name]: value});
    console.log('---user----', user);
  };
  const validateUser = () => {
    const {name, email, password, confirmPassword, phone} = user;
    console.log('---user----', authType, user);
    if (authType == 'logIn') {
      if (!(email && password)) {
        setError('All fields are required');
        console.log('---- one of the fields is empty444---');
      }
    } else {
      if (!(name && email && password && confirmPassword && phone)) {
        setError('All fields are required');
      } else if (!/^([0-9]{10})$/.test(phone)) {
        setError('Phone number is invalid');
      } else if (
        !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z](?=.*\W).{8,16})/.test(password)
      ) {
        setError(
          'Password should have special charachter, lower, upper, numeric charchters and length should be > 8',
        );
      } else if (password != confirmPassword) {
        setError("passwords don't match");
      } else {
        setError('');
        console.log('---all errors cleared----');
      }
    }
  };
  useEffect(() => {
    // setUserType(route.params.userType)
  }, []);
  return (
    <PortalChoiceBackground>
      <View>
        {authType == 'signUp' && (
          <View style={styles.inputContainer}>
            <Icon name="account" size={30} color={'white'} />
            <TextInput
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
              color={appBasicColor}
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
              <DateTimePicker
                testID="dateTimePicker"
                value={user.dob}
                mode={'date'}
                display='default'
                textColor='white'
                themeVariant='dark'
                onChange={(event, selectedDate) => {
                  handleInput('dob',selectedDate);
                  console.log('----text-----', selectedDate,);
                }}
              />
            </View>
          </View>
        )}
        {error && (
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginBottom: 8,
            }}>
            <Icon2 name="error" size={30} color={'red'} />
            <Text
              style={{
                color: 'red',
                fontWeight: '800',
                padding: 5,
                elevation: 4,
              }}>
              {error}
            </Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            validateUser();
          }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundColor: appBasicColor,
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
            shadowOffset: {width: 0, height: 1},
            elevation: 4,
          }}
          onPress={() => {
            setUser({
              name: '',
              email: '',
              phone: '',
              password: '',
              confirmPassword: '',
            });
            setError('');
            setAuthType(authType == 'logIn' ? 'signUp' : 'logIn');
          }}>
          <Text style={{color: 'blue', fontSize: 15, fontWeight: '700'}}>
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
  },
  inputContainer: {
    borderRadius: 5,
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
