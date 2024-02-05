import {useEffect, useMemo, useState} from 'react';
import {SafeAreaView, View, Text, BackHandler, TouchableOpacity} from 'react-native';
import RNRestart from 'react-native-restart'
let exp = 10;
const ThirdScreen = () => {
  /* we can also call a method of anpther class by creating an object of it
  new OtherclassClass().method()
*/
  // const [num,setNum] = useState(2)


  /* ios permissions ----- always allow ,,, while using app ... deny ....*/
  /* android permission ---- only this time ----- allow -- deny  ---- */

  useEffect(()=>{
    console.log("--------000-0-0-0-0-0")
    exp = exp+4
  },[exp])


  const exp2 = useMemo(()=>{
    console.log("----a-sd--as-d-as-d-")
    return (45 + Math.random() * 100);
  },[exp])


  /*

  three methods to bid a function

  1) bind funcion in constructor  this.hanler =this.handler.bind(this)
  2)  es2022. handler = () => {}. and call it lk\lk\ike this.handler
  3) handleclick(){}  and call it with calbback function () => this.handleclick // this makes copy of function every tym it rerenders makes multiple copies of same callback function
  4) handlclick(){} this.handleclick.bind(this,params)

  */


  useEffect(() => {
    let subscribe = BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('----- back press ----');
      return false;
    });
    return () => {
      subscribe.remove();
    };
  }, []);

  return (
    <SafeAreaView>
      <View>
        <Text>Third screen global variable = {global.variable}</Text>
        <TouchableOpacity onPress={()=>{
          // RNRestart.restart()
          // RNRestart.Restart();
          console.log("---- exp -------",exp,exp2)
          exp = exp +34
          // setNum(num+2)

        }}>
          <Text>
            refresh screen
          </Text>
        </TouchableOpacity>
        <Text>sfsdfsd
          {exp}</Text>
          <Text>memo
          {exp2}</Text>
      </View>
    </SafeAreaView>
  );
};

export default ThirdScreen;
