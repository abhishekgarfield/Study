import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';
import authorizationStyles from '../../styles/authorizationStyles';
import Icon from 'react-native-vector-icons/Entypo';

const PortalChoice = ({navigation}) => {
  return (
    <PortalChoiceBackground>
      <TouchableOpacity
        onPress={() => navigation.navigate('authModal', {userType: 'customer'})}
        style={authorizationStyles.buttonStyles}>
        <Text style={authorizationStyles.buttonTextStyle}>CUSTOMER</Text>
        <Icon name="arrow-with-circle-right" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('authModal', {userType: 'shopper'});
        }}
        style={authorizationStyles.buttonStyles}>
        <Text style={authorizationStyles.buttonTextStyle}>SHOPPER</Text>
        <Icon name="arrow-with-circle-right" size={30} color="white" />
      </TouchableOpacity>
    </PortalChoiceBackground>
  );
};

export default PortalChoice;
