import {useEffect, useState} from 'react';
import {Animated, TextInput, TouchableOpacity, View} from 'react-native';
import {AntDesign} from '../../assets/icons';
import searchBarStyles from '../../styles/searchBarStyles';

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    is_active: false,
    searcValue: '',
  });

  const startSearchAnim = () => {
    let toValue = searchData.is_active ? 0 : 45;
    Animated.timing(searchAnimation, {
      useNativeDriver: false,
      toValue: toValue,
      easing: Easing.bounce,
    }).start(({finished}) => {
      setSearchData({...searchData, is_active: !searchData.is_active});
    });
  };

  useEffect(()=>{
    startSearchAnim();
  },[])
  return (
    <Animated.View
      style={[
        searchBarStyles.searchBarTopContainer,
        {height: searchAnimation},
      ]}>
      <View style={searchBarStyles.searchbarInnerContainer}>
        <TextInput
          value={searchData.searcValue}
          onChangeText={text => {
            setSearchData({...searchData, searcValue: text});
          }}
          placeholder="Search items"
          style={searchBarStyles.textInputStyles}
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity
          onPress={() => {
            setSearchData({...searchData, searcValue: ''});
          }}>
          <AntDesign name={'closecircle'} size={20} color={'grey'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default SearchBar;
