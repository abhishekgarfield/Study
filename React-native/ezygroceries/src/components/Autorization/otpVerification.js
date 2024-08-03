import {Alert, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import PortalChoiceBackground from './portalChoiceBackground';
import {useEffect, useRef, useState} from 'react';
import {dispMessage} from '../Common/flashMessages';
import CountDown from 'react-native-countdown-component';
import { Title, text } from '../../assets/fonts';
import { black, linkColor } from '../Common/colors';

const OtpVerification = ({navigation, route}) => {
  let otpInput = useRef(null);
  let resendCounter = useRef(10);
  const [isResend, setIsResend] = useState(false);

  const {user} = route.params;

  const reSendOtp = () => {
    otpInput.current?.setValue('123456')
    dispMessage('success', 'Success', 'Otp has been sent successfully.');
    setIsResend(false);
    resendCounter.current += 30;
  };
  useEffect(() => {
    dispMessage('success', 'Success', 'Otp has been sent successfully.');
  }, []);
  return (
    <PortalChoiceBackground hide={true}>
      <View style={styles.verificationContainer}>
        <Text style={styles.verificationTitle}>Enter Verification Code</Text>
        <Text style={styles.varificationMessage}>
          We have sent you a 4-digit OTP on
        </Text>
        <Text style={styles.varificationMessage}>{user.email}</Text>
      </View>
      <OTPTextInput
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
          maxWidth:42,
          minWidth:30
        }}
        containerStyle={{
          justifyContent:'center',

          width:'100%',
          flexWrap:'wrap'
        }}
        keyboardType="numeric"
        handleTextChange={text => {
          if (text.length == 6) {
            if (text == '111111') {
              dispMessage('success', 'Success', 'Otp verified successfully');
            } else {
              dispMessage('danger', 'Error', 'Otp does not match.');
            }
          }
        }}
      />
      <View style={styles.resendContainer}>
        <TouchableWithoutFeedback
        onPress={()=>{
          if(isResend){
            reSendOtp()
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
              fontFamily:text,
              shadowRadius: 3.84,
              shadowColor: 'white',
              shadowOpacity: 1,
              shadowOffset: {width: 0, height: 0},
              elevation: 4,
              color:linkColor
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
    fontFamily:Title,
    fontSize: 25,
    fontWeight: '700',
    color: black
  },
  varificationMessage: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: Platform.OS == 'ios' ? '200' : 'normal',
    fontSize: 16,
    fontFamily:text,
    color: black
  },
  resendContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default OtpVerification;
