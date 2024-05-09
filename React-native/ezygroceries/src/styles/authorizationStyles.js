import { StyleSheet } from "react-native";

const authorizationStyles = StyleSheet.create({
    buttonStyles:{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        paddingHorizontal: 40,
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
    }
})

export default authorizationStyles;
