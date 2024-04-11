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
} from 'react-native';
import {background1, logo } from '../../assets/images';
const PortalChoiceBackground = ({children}) => {
  return (
    <ImageBackground
      resizeMode="cover"
      source={background1}
      style={{display: 'flex', flex: 1}}
      blurRadius={6}>
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
                  source={logo}
                  resizeMode="contain"
                  style={{height: 200, width: 200}}
                />
                <Text
                  style={{
                    marginTop: 10,
                    fontSize: 30,
                    fontWeight: '700',
                    fontFamily: 'cursive',
                  }}>
                  EZY GROCERIE
                </Text>
                <Text
                  style={{
                    lineHeight: 20,
                    marginTop: 10,
                    textAlign: 'center',
                    fontWeight: '500',
                  }}>
                  We are here to provide ezy
                  groceriesfsdfasdfsdfdfsdfgdsfgsdfgsdfgsdfgsdfgdsfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgdsfg
                </Text>
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
});
export default PortalChoiceBackground;






