import { Text, TouchableOpacity, View } from "react-native";

const Profile = ({navigation}) =>{
    return(
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Test')
        }}>
            <Text>Profile</Text>
        </TouchableOpacity>
    )
}

export default Profile;
