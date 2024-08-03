import * as React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import {background1, logo2 } from '../../assets/images';
import { BlurView } from '@react-native-community/blur';
import { black } from '../Common/colors';

const PortalChoiceBackground = ({children,hide}) => {
  console.log("----he;lllooo---")
  return (
    <ImageBackground
      resizeMode="cover"
      source={background1}
      style={{display: 'flex', flex: 1}}
      blurRadius={7}>
      <StatusBar  backgroundColor={'#e7e7e9'}/>
      <SafeAreaView style={{flex: 1, display:'flex',justifyContent:'center'}}>
        <KeyboardAvoidingView
          style={{display: 'flex',paddingHorizontal:10}}
          behavior={Platform.OS == 'ios' ?  "padding" : 'height'}
          keyboardVerticalOffset={0}>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={{display: 'flex', justifyContent: 'center', flex: 1}}>
              <View
                style={{
                  padding: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={logo2}
                  resizeMode="contain"
                  style={{height: 200, width: 200}}
                />
                { !hide &&<>
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 30,
                    fontFamily: 'OpenSans-Bold',
                    color: black
                  }}>
                  EZY GROCERIES
                </Text>
                <Text
                  style={{
                    color:'rgba(0,0,0,0.7)',
                    lineHeight: 20,
                    fontWeight:'400',
                    textAlign: 'center',
                    fontWeight: '500',
                    fontFamily:'OpenSans_SemiCondensed-Bold',
                  }}>
                    {"Let's save " }<Text style={{color:'green',fontWeight:'700',fontFamily:'OpenSans-BoldItalic'}}>{"environment !"}</Text>{"\n"+
                    "by eliminating paper based coupon system.\n"+
                    "We are here to provide ezy groceries."}
                </Text></>}
              </View>
              {children}
              <TextInput />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  inputField: {
    display: 'flex',
    borderColor: 'black',
    borderWidth: 5,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  }
});
export default PortalChoiceBackground;






