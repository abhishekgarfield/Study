import {Image, SafeAreaView, TouchableOpacity, Text, View} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
      <View>
        <Image source={{uri: ''}} />
      </View>
      <View>
        <TouchableOpacity>
          <Text>Incrememnt by 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
