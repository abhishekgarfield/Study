import { StatusBar } from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const dispMessage = (type, message, description, onhide = () => {}) => {
  showMessage({
    message: message,
    type: type,
    animated: true,
    description: description,
    animationDuration: 500,
    onHide:()=>{
      onhide();
    },
    icon: {
      icon: () => {
        return type == 'success' ? (
          <Icon
            name="white-balance-sunny"
            color={'white'}
            size={35}
            style={{marginRight: 5}}
          />
        ) : type == 'danger' ? (
          <Icon
            name="alert-circle-outline"
            color={'white'}
            size={35}
            style={{marginRight: 5}}
          />
        ) : type == 'info' ? (
          <Icon
            name="bell-check"
            color={'white'}
            size={35}
            style={{marginRight: 5}}
          />
        ) : type == 'warn' ? (
          <Icon
            name="white-balance-sunny"
            color={'white'}
            size={35}
            style={{marginRight: 5}}
          />
        ) : (
          <Icon
            name="white-balance-sunny"
            color={'white'}
            size={35}
            style={{marginRight: 5}}
          />
        );
      },
      position: 'left',
    },
    style: {
      zIndex:9999,
      alignItems: 'center',
      marginHorizontal: 0,
      paddingHorizontal: 5,
      fontWeight: 700,
      fontSize: 40,
    },
    hideStatusBar:false,
    textStyle: {fontWeight: 400, fontSize: 15, marginTop: 0},
    titleStyle: {fontSize: 18, margin: 0, fontWeight: 700, marginBottom: 0},
  });
};

// const flashMessageIcon = (type) =>{
//     console.log("----hello----")
//    return(
//     type == 'success' ?
//     <Icon name="white-balance-sunny"  color={'white'} size={30} style={{alignItems:'left',marginRight:15}}/> :
//         (type == 'danger' ? <Icon name="alert-circle"  color={'white'} size={30} style={{alignItems:'left',marginRight:15}}/> :
//             (type == 'info' ? <Icon name="bell-check"  color={'white'} size={30} style={{alignItems:'left',marginRight:15}}/>  :
//                 (type == 'warn' ? <Icon name="white-balance-sunny"  color={'white'} size={30} style={{alignItems:'left',marginRight:15}}/> :
//                     <Icon name="white-balance-sunny"  color={'white'} size={30} style={{alignItems:'left',marginRight:15}}/> )))
//    )
// }
