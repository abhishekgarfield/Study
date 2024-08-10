import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from "../../assets/icons"
import { Title, smallTitles } from "../../assets/fonts"
import MainHeader from "../Common/headers"

const Home = () =>{
    const user = {
        image: require('../../assets/images/sampDp2.jpg'),
        first_name: 'Abhishek',
        last_name: 'garfield',
        user_name: 'garfield1859'
    }
    return (
        <SafeAreaView style={{ display: 'flex', flex: 1, }}>
            <MainHeader/>
            <ScrollView style={{backgroundColor:'red', marginHorizontal:17}} contentContainerStyle={{}}>
            </ScrollView>
        </SafeAreaView>

    )
}




export default Home;



