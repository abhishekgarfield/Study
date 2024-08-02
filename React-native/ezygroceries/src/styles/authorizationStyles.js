import { StyleSheet } from "react-native";
import { Title } from "../assets/fonts";

const authorizationStyles = StyleSheet.create({
    buttonStyles:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 17,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderRadius: 5,
        margin: 10,
        marginBottom: 5,
        alignItems:'center'
    },
    buttonTextStyle:{

        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 1,
        fontSize: 20,
        fontFamily:Title
    }
})

export default authorizationStyles;
