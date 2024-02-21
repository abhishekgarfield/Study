import {Image, SafeAreaView, TouchableOpacity, Text, View, LogBox} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { incAsync, incrememnt } from './basicSlice';
const img = require('../components/img.jpeg')
LogBox.ignoreAllLogs()
export default () => {
const count = useSelector(state => state.count.value)
console.log("----render ----")
const dispatch= useDispatch()
  return(
    <SafeAreaView style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
      <View>
        <Image style={{height:100,width:100}} source={img} />
      </View>
      <Text>{count}count</Text>
      <View>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}} onPress={()=>{
          dispatch(incrememnt(2))
        }}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}} onPress={()=>{
          dispatch(incAsync(3))
        }}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by async 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderRadius:10,backgroundColor:'black',margin:10}}>
          <Text style={{color:'white',fontWeight:'600',textAlign:'center',padding:10}}>Incrememnt by 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};
