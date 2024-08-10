const rootStyles = {
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,  // Adjust the size as needed
      height: 70,
    },
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 60,  // Adjust the size of the circle
      height: 60,
      borderRadius: 30,  // This makes the view circular
      backgroundColor: 'black',  // Background color of the circle
    },
    focusedCircle: {
      backgroundColor: 'white',  // Change the background color when focused
    },
}

export const drawerStyles = {
    header:{
      height:180,
      justifyContent:"center",
      alignItems:"center",
      alignContent:"center"
    },
    profileCircle:{
      width:100,
      height:100,
      backgroundColor:"#12B886",
      borderRadius:100,
      justifyContent:"center",
      alignContent:"center",
      alignItems:"center"
    },
    profilePhoto:{
        width:100,
        height:100,
        borderRadius:100,
    },
    profileText:{
      color:"#fff",
      fontFamily:"PoppinsBold",
      fontSize:42
    },
    text:{
      fontFamily:"PoppinsBold",
      marginTop:15,
      fontSize:18,

    }
  }

  export default rootStyles;
