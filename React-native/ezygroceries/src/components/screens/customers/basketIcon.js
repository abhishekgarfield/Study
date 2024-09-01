import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { DataContext } from "../../../../store";
// import { useSelector } from "react-redux";
// import { basketItemTotal } from "../fetures/basketSlice";

const Basketicon = ({shop}) => {
  const dataContext = useContext(DataContext);

  const {items, setItems, total} = dataContext;
  const navigation=useNavigation();
  return (
    <>
      {items.length > 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: "rgba(0,204,188,255)",
            flexDirection: "row",
            position: "absolute",
            bottom: 10,
            padding: 20,
            alignItems: "center",
            marginHorizontal: 11,
            borderRadius: 10,

          }}
          onPress={()=>{
            navigation.navigate("basketScreen",{
              shop
            });
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "bold",

              backgroundColor: "rgba(0,150,150,255)",
              padding: 4,
              paddingHorizontal: 6,
            }}
          >
            {items.length}
          </Text>
          <Text
            style={{
              flexGrow: 1,
              alignItems: "center",
              textAlign: "center",
              color: "white",
              fontSize: 17,
              fontWeight: "900",
              padding: 4,
            }}
          >
            View Basket
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 17,
              fontWeight: "900",
              padding: 4,
            }}
          >
            {`₹${total}`}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};
export default Basketicon;
