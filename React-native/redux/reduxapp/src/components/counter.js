import {Image, SafeAreaView, TouchableOpacity, Text, View} from 'react-native';

export default () => {
  return(
    <SafeAreaView style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
      <View>
        <Image source={{uri: ''}} />
      </View>
      <View>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};
