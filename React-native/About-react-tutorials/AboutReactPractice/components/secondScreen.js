import {useNavigation} from '@react-navigation/native';
import {create} from 'domain';
import {createRef, useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import WebView from 'react-native-webview';
import FirstScreen from './firstScreen';

/* If we are already on same screen then [navigation.navigate] doesnot work
if we want to mave to same screen we are currently on we can use [navigation.push] */

// Auto scroll to particular element in scrollview and react native web view
const SecondScreen = ({navigation}) => {
  const [dataSource, setDatasSource] = useState([]);
  let dataCoords = [];
  //   const [dataCoords, setDataCoords] = useState({});
  const [refresh, setRefresh] = useState(false);
  const scrollRef = createRef();
  const getData = () => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        setDatasSource(data);
      });
  };

  const scrolltoindex = index => {
    console.log('---- index---', index, dataCoords);
    Number(index)
      ? scrollRef.current?.scrollTo({
          // use scrolltooffset for flatlist
          y: dataCoords[index],
          animated: true,
        })
      : null;
  };
  useEffect(() => {
    getData();

    const subscribe = BackHandler.addEventListener('hardwareBackPress',()=>{
      console.log("------ here ------");
    })

    return ()=>{
      subscribe.remove();
      BackHandler.removeEventListener('hardwareBackPress',()=>{
        console.log("-------------- hello --------");
      })
    }
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{display: 'flex', flexDirection: 'column', margin: 10}}>
          <TextInput
            style={{
              height: 50,
              backgroundColor: 'lightgrey',
              marginBottom: 10,
              padding: 10,
              fontSize: 20,
              borderRadius: 5,
            }}
            placeholder="scroll to ??"
            inputMode="numeric"
            keyboardType="number-pad"
            onChangeText={text => {
              scrolltoindex(text);
            }}
          />
          <ScrollView ref={scrollRef} style={{height: 300}}>
            {dataSource.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: 'lightgreen',
                    margin: 1.5,
                    padding: 5,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onLayout={({nativeEvent: {layout}}) => {
                    console.log('------', layout);
                    //   setDataCoords({...dataCoords, [index]: layout.y});
                    dataCoords = {...dataCoords, [index]: layout.y};
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignSelf: 'center',
                        textAlign: 'center',
                        flexBasis: '10%',
                        fontSize: 20,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                      {data.id}
                    </Text>
                    <Text
                      style={{
                        overflow: 'hidden',
                        display: 'flex',
                        fontSize: 20,
                        padding: 10,
                        color: 'white',
                        fontWeight: '600',
                        flexBasis: '90%',
                      }}>
                      {data.title}
                    </Text>
                  </View>
                  <View>
                    <Text style={{padding: 10, color: 'white', fontSize: 20}}>
                      {data.body}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={{height: 300, marginBottom: 20}}>
          {refresh ? (
            <ActivityIndicator color={'red'} size={30} animating={refresh} />
          ) : (
            <WebView
              source={{uri: 'https://aboutreact.com/'}}
              onLoad={() => {
                setRefresh(false);
              }}
              onLoadStart={() => {
                setRefresh(false);
              }}
              onLoadProgress={() => {
                setRefresh(false);
              }}
            />
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            padding: 10,
            borderRadius: 5,
            margin: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('------ on press -----');
            navigation.navigate('firstscreen',{
                userId:3
            });
            // navigation.goBack(); // for goin back to previous stack
            // navigation.popToTop() // it goes back to first screen in stack and dismiss all others
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '800',
              padding: 5,
            }}>
            Navigate to first screen
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            padding: 10,
            borderRadius: 5,
            margin: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('------ on press -----');
            //   navigation.navigate('firstscreen');
            navigation.push('secondscreen'); // for goin back to previous stack
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '800',
              padding: 5,
            }}>
            Go again to second screen push
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'skyblue',
            padding: 10,
            borderRadius: 5,
            margin: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            console.log('------ on press -----');
            //navigation.navigate('firstscreen');
            navigation.navigate('secondscreen'); // for goin back to previous stack
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '800',
              padding: 5,
            }}>
            Go again to second using navigate
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecondScreen;
