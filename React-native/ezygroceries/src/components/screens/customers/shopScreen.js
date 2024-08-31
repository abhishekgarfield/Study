import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { AntDesign } from "../../../assets/icons";
import { DataContext } from "../../../../store";
import ItemSkeletonLoader from "../../Common/skeletonLoader";
import axios from "axios";
import { getShopItems } from "../../../apis/api";
import Menucard from "./menuCard";
import Basketicon from "./basketIcon";
import { Title } from "../../../assets/fonts";

const Shopscreen = ({route}) => {
  console.log("---route.parms-----",route.params)
  const navigation = useNavigation();
  const [loader, setLOader] =useState(false)
  const {shop, is_subscribed} = route.params;
  console.log("-----shop----",shop)
  const dataContext = useContext(DataContext);
  const {auth_token} = dataContext.currentUser;
  const {items, setItems} = dataContext;

  const [shop_items, setShopItems] = useState([])


  const fetchShopItems = () => {
    axios
      .get(`${getShopItems}?shop_id=${shop.id}`, {
        headers: {
          ezyGroceries_header_key: auth_token,
        },
      })
      .then(async(res) => {
        console.log("-----------",res.data)
        setShopItems(res.data);
      })
      .catch(err => {
        if (err.response.status == 401) {
          dispMessage(err.response.data);
        }
        console.log('----errr---', err.response.data);
      });
  };

  useEffect(()=>{
    fetchShopItems()
  },[])

  return (
    <>
    <ScrollView>
      <View>
        <Image
          source={{ uri: shop.pic_url }}
          style={{ height: 250, flexDirection: "column" }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            position: "absolute",
            top: 45,
            marginLeft: 10,
            borderRadius: 50,
            padding: 10,
          }}
          onPress={() => {
            setItems([]);
            navigation.goBack();

          }}
        >
          <AntDesign name="arrowleft" color={"rgba(0,204,188,255)" } size={20}/>
        </TouchableOpacity>
      </View>
      <View style={{ color: "grey", marginTop: 5 }}>
        <Text style={styles.txt}>{`${shop.name}`}</Text>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 5,
            alignItems: "center",
            color: "grey",
            marginLeft: 5,
            paddingVertical: 1,
          }}
        >
        </View>
        <View>
          <Text
            style={{
              fontSize: 15,
              paddingHorizontal: 5,
              paddingVertical: 1,
              color: "grey",
              marginLeft: 5,
              marginBottom: 3,
            }}
          >
            {shop.description}
          </Text>
        </View>

        <View style={{ backgroundColor: "lightgrey" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginVertical: 15,
              marginLeft: 10,
            }}
          >
            Shop items
          </Text>
        </View>
      </View>

    <ScrollView>
      {
        !loader ? ( shop_items.length > 0 ? <Menucard dishes={shop_items} title={shop.name} /> : <Text style={{fontFamily:Title,textAlign:'center',paddingVertical:20,fontSize:20}}>No Items added</Text> ): (<><ItemSkeletonLoader/><ItemSkeletonLoader/><ItemSkeletonLoader/><ItemSkeletonLoader/></>)
      }

    </ScrollView>

    </ScrollView>
    <View>
      <Basketicon shopName = {shop.name}/>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginLeft: 5,
  },
});

export default Shopscreen;
