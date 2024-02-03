import {SafeAreaView, View, Text} from 'react-native';

const ThirdScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Third screen global variable = {global.variable}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ThirdScreen;
