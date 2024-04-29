import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';
import authorizationStyles from '../../styles/authorizationStyles';
const PortalChoice = ({navigation}) => {
  return (
    <PortalChoiceBackground>
      <TouchableOpacity
      onPress={()=>navigation.navigate('authModal',{userType: 'customer'})}
        style={authorizationStyles.buttonStyles}>
        <Text
          style={authorizationStyles.buttonTextStyle}>
          CUSTOMER
        </Text>
        <Text
          style={authorizationStyles.buttonTextStyle}>
          >
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{navigation.navigate('authModal',{userType: 'shopper'})}}
        style={authorizationStyles.buttonStyles}>
        <Text
          style={authorizationStyles.buttonTextStyle}>
          SHOPPER
        </Text>
        <Text
          style={authorizationStyles.buttonTextStyle}>
          >
        </Text>
      </TouchableOpacity>
    </PortalChoiceBackground>
  );
};


export default PortalChoice;

