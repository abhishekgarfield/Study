import { useNavigation } from '@react-navigation/native';
import {create} from 'domain';
import {createRef, useEffect, useState} from 'react';
import {ScrollView, TextInput, View, Text, SafeAreaView, ActivityIndicator, LogBox} from 'react-native';
import WebView from 'react-native-webview';


const SecondScreen = ({navigation}) => {
    const [dataSource, setDatasSource] = useState([]);
    const [dataCoords, setDataCoords] = useState({});
    const [refresh,setRefresh] = useState(false)

    navigation.

    // const navigation = useNavigation()
    // navigation.setOptions({

    // })

    const scrollRef = createRef();
    const getData = () => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(data => {
          setDatasSource(data);
        });
    };

    const scrolltoindex = index => {
      console.log("---- index---",index )
      Number(index)
        ? scrollRef.current?.scrollTo({
            y: dataCoords[index],
            animated: true,
          })
        : null;
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <SafeAreaView>
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
                    console.log("------",dataCoords)
                    setDataCoords({...dataCoords, [index]: layout.y});
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
        <View style={{height:300}}>
        {refresh ? <ActivityIndicator color={'red'} size={30} animating={refresh}/> :
        <WebView
          source={{uri:'https://aboutreact.com/'}}
          onLoad={()=>{setRefresh(false)}}
          onLoadStart={()=>{console.log("--dsf-s-df-sd-fs-df-sdf-");setRefresh(false)}}
          onLoadProgress={()=>{console.log("-as-d-as-d-ad-a-sd-as-d-asd-a-sd-a-sd");setRefresh(false)}}/> }
        </View>

      </SafeAreaView>
    );
  };

  export default SecondScreen;
