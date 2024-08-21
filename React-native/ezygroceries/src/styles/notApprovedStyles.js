import { Title, smallTitles } from "../assets/fonts";
import { secondaryColor } from "../components/Common/colors";

export const notApprovedStyles = {
    topView: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: secondaryColor,
      padding: 10,
      borderRadius: 5,
      elevation: 4,
      shadowColor: 'black',
      shadowOffset: {height: 3, width: 3},
      shadowRadius: 2,
      shadowOpacity: 0.2,
    },
    innerContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    label: {
      fontSize: 17,
      color: 'black',
      fontFamily: Title,
      paddingBottom:5
    },
    textStyle: {
      fontSize: 13,
      color: 'rgba(0,0,0,0.8)',
      fontFamily: smallTitles,
      paddingBottom:5
    },
  };
