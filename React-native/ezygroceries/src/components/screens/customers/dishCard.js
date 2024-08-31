import {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {AntDesign} from '../../../assets/icons';
import {white} from '../../Common/colors';
import {DataContext} from '../../../../store';
// import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";
// import { useDispatch, useSelector } from "react-redux";
// import { addtoBasket, removeFromBasket } from "../fetures/basketSlice";
// import { setRestaurant } from "../fetures/restaurantSlice";

const Dishcard = ({dish, title}) => {
  const [isPressed, setIspressed] = useState(false);
  const dataContext = useContext(DataContext);

  const {items, setItems} = dataContext;
  const additemtobasket = () => {
    setItems([...items, dish]);
  };
  const removeitemfrombasket = () => {
    const index = items.findIndex(
      item => JSON.stringify(item) === JSON.stringify(dish),
    );
    console.log(index);
    if (index >= 0) {
    items.splice(index, 1)
      setItems([...items]);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={e => {
        setIspressed(!isPressed);
      }}>
      <View style={isPressed ? styles.nobrdr : styles.brdr}>
        <View style={{width: 2, flexGrow: 1}}>
          <Text style={{fontWeight: '400', fontSize: 20, padding: 3}}>
            {dish.name}
          </Text>
          <Text style={{padding: 3, color: 'grey'}}>{dish.description}</Text>
          <Text
            style={{
              padding: 3,
              color: 'grey',
              marginBottom: 5,
            }}>{`₹${dish.price}`}</Text>
          {isPressed && (
            <View
              style={{flexDirection: 'row', padding: 3, alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0,204,188,255)',
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={additemtobasket}>
                <AntDesign name={'plus'} size={15} color={white} />
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 5}}>
                {
                  items.filter(item => {
                    if (JSON.stringify(item) == JSON.stringify(dish)) {
                      return item;
                    }
                  }).length
                }
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(0,204,188,255)',
                  padding: 10,
                  borderRadius: 50,
                }}
                onPress={removeitemfrombasket}>
                <AntDesign name={'minus'} size={15} color={white} />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Image source={{uri: dish.image_urls[0]}} style={{width: 70, height: 70}} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  brdr: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 2,
  },
  nobrdr: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0,
  },
});

export default Dishcard;
