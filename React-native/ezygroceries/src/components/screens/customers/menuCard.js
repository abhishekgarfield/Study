import { View,Text,ScrollView } from "react-native";
import { useEffect } from "react";
import Dishcard from "./dishCard";

 const Menucard=({dishes,title, is_subscribed})=>{

    return(
        <ScrollView
        contentContainerStyle={{
            paddingBottom:120
        }}>
            {dishes.map((item,index)=><Dishcard dish={item} key={index} title={title} is_subscribed={is_subscribed}/>)}
        </ScrollView>
    );
}
export default Menucard;
