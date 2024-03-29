import * as React from 'react';
import {View, Text, KeyboardAvoidingView, SafeAreaView, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { background1, logo } from './src/assets/images';

const App = () => {
  return (
    <ImageBackground resizeMode='cover' source={background1} style={{display:'flex',flex:1}} blurRadius={6}>

    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1}} contentContainerStyle={{flex:1}}>
      <View style={{display:'flex',justifyContent:'center',flex:1}}>
        <View>
          <Image source={logo} resizeMode='contain' style={{height:200,width:200}} />
          <Text>We are here to provide ezy groceriesfsdfasdfsdfdfsdfgdsfgsdfgsdfgsdfgsdfgdsfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgdsfg</Text>
        </View>
        <TouchableOpacity style={{display:'flex',flexDirection:'row' ,backgroundColor:'rgba(0, 0, 0, 0.5)',padding:20,paddingHorizontal:40,justifyContent:'space-between',borderRadius:5,margin:10,}}>
          <Text style={{color:'white',textAlign:'center',fontWeight:'600',letterSpacing:1,fontSize:20}}>CUSTOMER</Text>
          <Text style={{color:'white',textAlign:'center',fontWeight:'500',letterSpacing:1,fontSize:20}}>></Text>
        </TouchableOpacity>
        <TouchableOpacity style={{display:'flex',flexDirection:'row' ,backgroundColor:'rgba(0, 0, 0, 0.5)',padding:20,paddingHorizontal:40,justifyContent:'space-between',borderRadius:5,margin:10,}}>
          <Text style={{color:'white',textAlign:'center',fontWeight:'600',letterSpacing:1,fontSize:20}}>SHOPPER</Text>
          <Text style={{color:'white',textAlign:'center',fontWeight:'500',letterSpacing:1,fontSize:20}}>></Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>

  );
};


const styles = StyleSheet.create({
  inputField:{
    display:'flex',
    borderColor:'black',
    borderWidth:5,
    height:50,
    borderRadius:10,
    backgroundColor:'lightgray'
  }
})
export default App;
