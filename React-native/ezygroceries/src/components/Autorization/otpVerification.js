import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PortalChoiceBackground from './portalChoiceBackground';
import {useContext, useEffect, useRef, useState} from 'react';
import {dispMessage} from '../Common/flashMessages';
import CountDown from 'react-native-countdown-component';
import {Title, text} from '../../assets/fonts';
import {black, linkColor} from '../Common/colors';
import OtpVerify from 'react-native-otp-verify';
import axios from 'axios';
import {customerResendOtp, customerVerifyOtp, employeeResendOtp, employeeVerifyOtp, setHeader} from '../../apis/api';
import {insertRecord} from '../../config/sqlite';
import tables from '../../helpers/tables';
import { DataContext, setContextInstance } from '../../../store';

const OtpVerification = ({navigation, route}) => {
  const dataContext = useContext(DataContext)
  let otpInput = useRef(null);
  let resendCounter = useRef(10);
  const [isResend, setIsResend] = useState(false);
  const {
    user: {email, user_id, name, userType}
  } = route.params;

  const reSendOtp = () => {
    setIsResend(false);
    resendCounter.current += 30;
    const data = {
      user_id: user_id,
      email: email,
      name: name,
    };
    axios
      .post(userType == "shopper" ? employeeResendOtp : customerResendOtp, {
        data,
      })
      .then(res => {
        if (res.status == 200) {
          otpInput.current?.setValue('');
          dispMessage(
            'success',
            'Success',
            'Otp has been resent successfully.',
          );
        } else if (res.status == 202) {
        }
      })
      .catch(err => {
        dispMessage('danger', 'Error', 'server erro');
      });
  };

  const verifyOtp = text => {
    const data = {
      otp: text,
      user_id: user_id,
      email: email,
      name: name,
    };
    axios
      .post( userType== "shopper" ? employeeVerifyOtp : customerVerifyOtp, {data})
      .then(res => {
        if (res.status == 200) {
          console.log("-as-d-as-da-sd-a-sd-as-d-as-d-------")
          const {first_name, email, role_id, shop_id, is_approved, id, auth_token} =
            res.data.user;
            console.log("-as-d-as-da-sd-a-sd-as-d-as-d-------",is_approved,"----",userType)

          if (is_approved || userType != 'shopper') {
            console.log("-----a-sd-a-s-d-a---hllooo----")
            insertRecord(
              tables.UserTable,
              'first_name, id, email, role_id, shop_id, is_employee, auth_token ',
              [first_name, id, email, role_id, shop_id, userType == 'shopper', auth_token],
            ).then(res => {
                console.log("----heloo 0000001111110000000----");
                dataContext.setCurrentUser({first_name, email, role_id, shop_id, is_approved, id, is_employee: userType == 'shopper' ? 1 : 0, auth_token })

                setHeader(auth_token);
                // navigation.navigate('HomeStack', {
                //   user: res.data.user,
                // });
              })
              .catch(err => {
                console.log('---error while saving employee data--', err);
              });
          }
        } else if (res.status == 202) {
          dispMessage('danger', 'Error', res.data);
        }
      })
      .catch(err => {
        console.log('---asd-asd-a-s-', err);
      });
  };

  useEffect(() => {
    dispMessage('success', 'Success', 'Otp has been sent successfully.');
    if (Platform.OS == 'android') {
      OtpVerify.getHash(hash => {
        console.log('----hash----', hash);
      });
      OtpVerify.startOtpListener(message => {
        console.log('----message---', message);
        if (message) {
          let otp = /[0-9]{6}/.exec(message)[0];
          otpInput.current?.setValue(otp);
        }
      }).catch(err => {
        console.log('----err---', err);
      });
    }

    return () => {
      if (Platform.OS == 'android') {
        OtpVerify.removeListener();
      }
    };
  }, []);
  return (
    <PortalChoiceBackground hide={true}>
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Enter Verification Code</Text>
        <Text style={styles.varificationMessage}>
          We have sent you a 6-digit OTP on
        </Text>
        <Text style={styles.varificationMessage}>{email}</Text>
      </View>
      <OTPTextInput
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        autoFocus={true}
        ref={e => (otpInput.current = e)}
        inputCount={6}
        textInputStyle={{
          borderRadius: 10,
          borderWidth: 1,
          borderBottomWidth: 1,
          height: 55,
          borderColor: 'black',
          backgroundColor: 'rgba(0,0,0,0.3)',
          maxWidth: 42,
          minWidth: 30,
          fontWeight: '700',
        }}
        containerStyle={{
          justifyContent: 'center',

          width: '100%',
          flexWrap: 'wrap',
        }}
        keyboardType="numeric"
        handleTextChange={text => {
          if (text.length == 6) {
            dispMessage('Info', 'Info', 'Verifyig your otp.');
            verifyOtp(text);
          }
        }}
      />
      <View style={styles.resendContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (isResend) {
              reSendOtp();
            }
          }}>
          <View
            style={{
              shadowRadius: 3.84,
              shadowColor: 'white',
              shadowOpacity: 0.7,
              shadowOffset: {width: 0, height: 0},
              elevation: 4,
            }}>
            <Text
              style={{
                ...styles.varificationMessage,
                fontSize: 12,
                marginRight: 4,
                fontWeight: '700',
                fontFamily: text,
                shadowRadius: 3.84,
                shadowColor: 'white',
                shadowOpacity: 1,
                shadowOffset: {width: 0, height: 0},
                elevation: 4,
                color: linkColor,
              }}>
              {isResend ? 'Resend otp' : 'Resend code in'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <CountDown
          until={resendCounter.current}
          lastUntil={0}
          size={10}
          onFinish={() => {
            setIsResend(true);
          }}
          digitStyle={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            width: 20,
            height: 25,
            fontSize: 10,
            marginBottom: 10,
          }}
          digitTxtStyle={{
            color: 'white',
          }}
          timeToShow={['M', 'S']}
          timeLabels={[]}
        />
      </View>
    </PortalChoiceBackground>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  verificationTitle: {
    fontFamily: Title,
    fontSize: 25,
    fontWeight: '700',
    color: black,
  },
  varificationMessage: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: Platform.OS == 'ios' ? '200' : 'normal',
    fontSize: 16,
    fontFamily: text,
    color: black,
  },
  resendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default OtpVerification;
