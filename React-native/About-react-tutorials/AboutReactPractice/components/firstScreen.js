import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Switch,
  ActivityIndicator,
  Alert,
  LogBox,
  Image,
  RefreshControl,
  FlatList,
  UIManager,
  Platform,
  Animated,
  LayoutAnimation,
} from 'react-native';

LogBox.ignoreAllLogs();

const App1 = ({navigation}) => {
  const [valX, setValX] = useState(0);
  const [valY, setValY] = useState(100);
  const [numberToCheck, setNumberToCheck] = useState(0);
  const [allMovies, setAllMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  // const navigation =useNavigation() // can also be imported from props alwasys passes on to while routing
  useEffect(() => {
    const test = setInterval(() => {
      setValX(val => {
        return val + 1;
      });
      setValY(valY - 1);
    }, 1000);
    fetch('https://moviesdatabase.p.rapidapi.com/titles', {
      method: 'get',
      headers: {
        'X-RapidAPI-Key': 'dfd566a0eamsh78fc07ed9b02254p1d2a14jsnfd26fa4305c0',
        'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
      },
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setAllMovies(data['results']); // with .text() // with .json()
      });
    return () => {
      clearInterval(test);
    };
  }, []);

  const checkNum = () => {
    isNaN(numberToCheck)
      ? Alert.alert('Error', 'Not a number')
      : Alert.alert('Correct', 'It is a number');
  };

  const handleFilteredMovies = query => {
    setFilteredMovies(
      allMovies.filter(({originalTitleText: {text}}) =>
        text.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  return (
    <ScrollView style={{display: 'flex'}}>
      <View style={{display: 'flex'}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View style={{...style.mainContainer}}>
            <Text
              style={{
                display: 'flex',
                alignSelf: 'center',
                color: 'white',
                fontWeight: 600,
              }}>
              Check numbers{'\n'}
            </Text>
            <TextInput
              placeholderTextColor="grey"
              style={{
                padding: 10,
                fontSize: 15,
                backgroundColor: 'white',
                borderRadius: 5,
                marginBottom: 5,
              }}
              value={numberToCheck}
              inputMode="numeric"
              placeholder="Please enter any number ...."
              keyboardType="number-pad"
              onChange={text => {
                setNumberToCheck(parseInt(text.nativeEvent.text));
              }}
            />
            <TouchableOpacity
              style={{backgroundColor: 'red', padding: 10, borderRadius: 5}}
              onPress={() => {
                checkNum();
              }}>
              <Text
                style={{
                  color: 'white',
                  alignSelf: 'center',
                  fontWeight: '800',
                  padding: 4,
                  fontSize: 15,
                }}>
                Check number
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, padding: 10}}>
            <TextInput
              placeholderTextColor="grey"
              style={{
                padding: 10,
                fontSize: 15,
                backgroundColor: 'white',
                borderRadius: 5,
                marginBottom: 7,
              }}
              autoCapitalize="none"
              inputMode="text"
              placeholder="Enter movie name ..."
              onChangeText={text => handleFilteredMovies(text)}
            />
            <ScrollView
              style={
                filteredMovies.length > 0 && {
                  maxHeight: 400,
                  overflow: 'scroll',
                }
              }>
              {filteredMovies.map((movie, index) => {
                return (
                  <View
                    onStartShouldSetResponder={() => {
                      setSelectedMovies([...selectedMovies, movie]);
                      return true;
                    }}
                    key={index}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderRadius: 10,
                      flexDirection: 'row',
                      backgroundColor: '#808080',
                      padding: 10,
                      borderBottomColor: 'black',
                      borderBottomWidth: 2,
                    }}>
                    <Text style={{display: 'flex', flexBasis: '50%'}}>
                      {movie.originalTitleText.text}
                    </Text>
                    <Image
                      style={{height: 50, width: 50}}
                      srcSet={movie?.primaryImage?.url}
                    />
                  </View>
                );
              })}
              {filteredMovies.length == 0 && (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 30,
                    fontWeight: '600',
                    textAlign: 'center',
                    margin: 10,
                  }}>
                  No movies searched yet !
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: '600',
            textAlign: 'center',
            margin: 10,
          }}>
          {selectedMovies.length > 0 ? 'Selected movies' : 'No movies selected'}
        </Text>
        <ScrollView
          style={{display: 'flex', flex: 1, padding: 10, height: 'auto'}}
          contentContainerStyle={{}}>
          {selectedMovies?.map(movie => {
            return (
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: '600'}}>
                  {movie?.originalTitleText?.text}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        {/* <View
          style={style.bottomContainer}
          onStartShouldSetResponder={() => {
            Alert.alert('check', 'test check');
            return true;
          }}>
          <Text style={{fontWeight: '600', fontSize: 20}}>{`Bottom View`}</Text>
        </View> */}
      </View>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: '600',
          textAlign: 'center',
          margin: 10,
        }}>
        Refresh view
      </Text>

      <RefreshView />
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: '600',
          textAlign: 'center',
          margin: 10,
        }}>
        Pokemons
      </Text>
      <LoadMoreView />
      <Text
        style={{
          color: 'white',
          fontSize: 30,
          fontWeight: '600',
          textAlign: 'center',
          margin: 10,
        }}>
        Auto refresh
      </Text>
      <AutoRefreshOnEnd />
      <AnimView />
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
          navigation.navigate('secondscreen',{
            username:'abhishek'
          });
        }}>
        <Text
          style={{color: 'white', fontSize: 20, fontWeight: '800', padding: 5}}>
          Navigate to second
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
          navigation.navigate('thirdscreen',{
            username:'abhishek'
          });
        }}>
        <Text
          style={{color: 'white', fontSize: 20, fontWeight: '800', padding: 5}}>
          Navigate to third
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Commnets = () => {
  return <View>{/* <Text>Comment</Text> */}</View>;
};

const style = StyleSheet.create({
  first_div: {
    backgroundColor: 'red',
  },
  scrollViewStyle: {
    backgroundColor: 'lightgrey',
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    paddingTop: 0,
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'red',
    height: 50,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Test = () => {
  return (
    <SafeAreaView>
      <View>
        <View
          style={style.first_div}
          onStartShouldSetResponder={() => {
            Alert.alert('sdfsdf', 'asdasd');
            return true;
          }}>
          <Text>Hello</Text>
          <TouchableOpacity>
            <Text>Button</Text>
          </TouchableOpacity>
          <TextInput inputMode="text" placeholder="enter ypur name" />
          <ScrollView style={style.scrollViewStyle}>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
            <View>
              <Text>first</Text>
            </View>
          </ScrollView>
          <Switch />
          <ActivityIndicator />
        </View>
        <View style={{backgroundColor: 'skyblue'}}>
          <Text>Value for x = {'valX'}</Text>
          <Text>Value for y = {'valY'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const FirstScreen = ({navigation, route}) => {
  const {userId} = route.params;
  console.log("--------- user id -------",userId)
  const [inputValue, setInputValue] = useState('');
  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: 'black'}}>
      <View
        style={{
          margin: 5,
          marginHorizontal: 10,
          borderColor: 'black',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10,
        }}>
        <Image
          style={{height: 25, width: 25}}
          resizeMode="stretch"
          src="https://raw.githubusercontent.com/AboutReact/sampleresource/master/input_username.png"
        />
        <TextInput
          editable={true}
          placeholder="Enter your name here"
          style={{padding: 10, backgroundColor: 'white', flexGrow: 1}}
          placeholderTextColor={'grey'}
          onChangeText={text => {
            setInputValue(text);
          }}
        />
      </View>
      <View style={{margin: 10}}>
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
          }}
          onLongPress={() => {
            console.log('-------- long press ------');
          }}
          onPressIn={() => {
            console.log('------- press in ------');
          }}
          onPressOut={() => {
            console.log('--------- on press out ------');
          }}>
          <Text style={{color: 'white', fontSize: 15, fontWeight: '800'}}>
            Press
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,
            margin: 3,
            alignItems: 'center',
            flexDirection: 'row',
          }}
          onPress={() => {
            !inputValue.trim()
              ? Alert.alert('Error', 'Input field is empty')
              : Alert.alert('Correct', 'Input field is not empty');
          }}>
          <Image
            style={{
              height: 25,
              width: 25,
            }}
            src="https://raw.githubusercontent.com/AboutReact/sampleresource/master/google-plus.png"
          />
          <Text
            style={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: '800',
            }}>
            Ckeck empty field
          </Text>
        </TouchableOpacity>
      </View>
      <App1 navigation={navigation} />
    </SafeAreaView>
  );
};

export default FirstScreen;

/*
=============  terminal  =========

chmod 777 file_name // tp give permission to files and directories

Read = 4
Write = 2
Execute = 1

d = directory
- = regular file
| = soft link


add permission alues to give permission to p[aricular class 7 = ( read , write , execute )
classes = root , groups , user

chown user // to change class of file ( change ownership )


*/

const Test2 = () => {
  return (
    <SafeAreaView>
      <Loginscreen />
    </SafeAreaView>
  );
};

/*
sign up fields
 email
 name
 phone
 password
 confirm password
 login using social

login fields
  using password
  using otp
  using social links
*/

const Loginscreen = () => {
  return (
    <View style={{display: 'flex', backgroundColor: 'lightgrey'}}>
      <View></View>
    </View>
  );
};

//refresh view using scrollview

const RefreshView = () => {
  const data = {
    0: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    1: [11, 12, 13, 14, 15, 16, 17, 18],
    2: [111, 122, 133, 144, 154, 166, 177, 188],
  };
  const [ind, setInd] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    console.log('------ in refrsh ---');
    setRefresh(true);
    setTimeout(() => {
      setInd(prevValue => {
        console.log('-----prev value----', prevValue);
        return prevValue + 1;
      });
      setRefresh(false);
    }, 3000);
  };
  return (
    <ScrollView
      style={{
        backgroundColor: 'lightgrey',
        height: 'auto',
        maxHeight: 200,
        margin: 10,
      }}
      refreshControl={
        <RefreshControl
          onRefresh={() => {
            onRefresh();
          }}
          refreshing={refresh}
        />
      }>
      {data[ind]?.map((ele, index) => {
        return (
          <View
            key={index}
            style={{backgroundColor: 'yellow', padding: 10, margin: 10}}>
            <Text>{ele}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

// Load more using pagination and offsets
// curl www.google.com can also be used for extracting data from apis insted of postman
const LoadMoreView = () => {
  const [offset, setOffset] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState([]);
  const getData = () => {
    setRefresh(true);
    fetch(`https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=5`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data2 => {
        console.log('------ data ----', ...data2.results);
        setOffset(preVal => preVal + 2);
        setRefresh(false);
        setData([...data, ...data2.results]);
        console.log(data);
      });
  };

  const isCloseToTop = ({contentOffset}) => {
    return contentOffset.y == 0;
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView
      onScroll={({nativeEvent}) => {
        console.log(nativeEvent);
      }}
      scrollEventThrottle={400}
      style={{
        backgroundColor: 'lightgrey',
        height: 'auto',
        maxHeight: 300,
        margin: 10,
        marginVertical: 0,
      }}>
      {data?.map(({name}, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'skyblue',
              padding: 10,
              marginVertical: 3,
              borderRadius: 3,
              marginHorizontal: 5,
            }}>
            <Text>{name.toUpperCase()}</Text>
          </View>
        );
      })}
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'red',
          padding: 10,
          justifyContent: 'flex-start',
          margin: 10,
        }}
        onPress={() => {
          getData();
        }}>
        <Text style={{fontWeight: '700', color: 'white', fontSize: 17}}>
          Load more
        </Text>
        {refresh && <ActivityIndicator color={'white'} />}
      </TouchableOpacity>
    </ScrollView>
  );
};

// auto refresh with scrollview in end

const AutoRefreshOnEnd = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [offset, setOffset] = useState(1);

  const hasReachedEnd = ({contentOffset, contentSize, layoutMeasurement}) => {
    return layoutMeasurement.height + contentOffset.y >= contentSize.height;
  };

  const isTop = ({contentOffset}) => {
    return contentOffset.y == 0;
  };

  const getData = () => {
    setRefresh(true);
    fetch(`https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=5`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data2 => {
        console.log('------ data ----', ...data2.results);
        setOffset(preVal => preVal + 2);
        setRefresh(false);
        setData([...data, ...data2.results]);
        console.log(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView
      style={{
        maxHeight: 200,
        height: 'auto',
        backgroundColor: 'lightgrey',
        margin: 10,
      }}
      scrollEventThrottle={400} // for finding scroll
      onScroll={({nativeEvent}) => {
        console.log('--- native ---', nativeEvent);
        if (hasReachedEnd(nativeEvent)) {
          console.log('-------- in end of scroll -----');
          getData();
        }
        if (isTop(nativeEvent)) {
          console.log('---- in top of scroll ----');
        }
      }}>
      {data?.map(({name}, index) => {
        return (
          <View
            key={index}
            style={{
              backgroundColor: 'skyblue',
              padding: 10,
              marginVertical: 3,
              borderRadius: 3,
              marginHorizontal: 5,
            }}>
            <Text>{name.toUpperCase()}</Text>
          </View>
        );
      })}
      {refresh && <ActivityIndicator color={'red'} size={40} />}
    </ScrollView>
  );
};

// auto refresh using flatlist when at end

const AutoRefreshFlatList = () => {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [offset, setOffset] = useState(1);

  const getData = () => {
    setRefresh(true);
    fetch(`https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=5`, {
      method: 'get',
    })
      .then(res => res.json())
      .then(data2 => {
        console.log('------ data ----', ...data2.results);
        setOffset(preVal => preVal + 2);
        setRefresh(false);
        setData([...data, ...data2.results]);
        console.log(data);
      });
  };

  const Footer = () => {
    return <ActivityIndicator color={'green'} size={40} />;
  };

  const Item = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'skyblue',
          padding: 10,
          marginVertical: 3,
          borderRadius: 3,
          marginHorizontal: 5,
        }}>
        <Text>{item.name.toUpperCase()}</Text>
      </View>
    );
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={Item}
      ListHeaderComponent={() => {
        return <View></View>;
      }} // to add header component in list
      ListFooterComponent={Footer} // footer component
      onEndReachedThreshold={0.5} // add content ehrn reached en
      onEndReached={console.log('---sd-s-d-s-ds-')}
      ListEmptyComponent={() => {
        return <View></View>;
      }} // for listing emptly message when no elements in list
    />
  );
};

// Animation in scrollview

const AnimView = () => {
  const imageUrl =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/logosmalltransparen.png';

  if (Platform.OS == 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const setAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 500,
      create: {
        property: 'scaleXY',
        type: 'easeIn',
        springDamping: 0.7,
      },
      update: {
        property: 'scaleXY',
        type: 'easeIn',
        springDamping: 0.7,
      },
      delete: {
        property: 'scaleXY',
        type: 'easeIn',
      },
    });
  };
  const addItem = () => {
    let obj = {
      key: data.length,
      uri: imageUrl,
      title: 'Animated FlatList Example Heading' + data.length,
      description: 'Please visit www.aboutreact.com',
      animated: true,
    };
    setData([...data, obj]);
    setAnimation();
  };

  const removeItem = key2 => {
    setData(data?.filter(({key}) => key != key2));
    setAnimation();
  };

  const [data, setData] = useState([]);
  return (
    <View style={{display: 'flex', flexDirection: 'column', margin: 10}}>
      <TouchableOpacity
        style={{backgroundColor: 'red', padding: 10, borderRadius: 5}}
        onPress={addItem}>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            fontWeight: '800',
            padding: 4,
            fontSize: 15,
          }}>
          Add item
        </Text>
      </TouchableOpacity>
      <ScrollView style={{maxHeight: 200, height: 'auto', margin: 10}}>
        {data?.map((item, index) => {
          return (
            <Animated.View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 10,
              }}
              onStartShouldSetResponder={() => {
                removeItem(item?.key);
                return true;
              }}>
              <View style={{display: 'flex', padding: 10}}>
                <Image
                  src={item?.uri}
                  style={{height: 70, width: 70}}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              </View>
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                <Text style={{color: 'white'}}>{item.title}</Text>
                <Text style={{color: 'white'}}>{item.description}</Text>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};
