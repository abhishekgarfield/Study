import * as React from 'react';
import {
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';
import authorizationStyles from '../../styles/authorizationStyles';
import Icon from 'react-native-vector-icons/Entypo';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {errorColor, red} from '../Common/colors';
import schema from '../../helpers/schema';
import { deleteTable } from '../../config/sqlite';
import createAllTables from '../../helpers/createTables';

const PortalChoice = ({navigation}) => {
  React.useEffect(() => {
    createAllTables()
    const exitApp = BackHandler.addEventListener('hardwareBackPress', () => {
      showMessage({
        animated: true,
        autoHide: false,
        message: 'Are you sure you want to exit?',
        title: 'Exit app',
        type: 'info',
        renderAfterContent: () => {
          return (
            <View style={portalChoiceStyles.alertContainer}>
              <View style={{ marginRight: 3}}>
                <Button title="exit" color={red} onPress={()=>{
                  BackHandler.exitApp();
                }}/>
              </View>
              <View style={{ marginLeft: 3}}>
              <Button title="cancel" onPress={()=>{
                hideMessage()
                console.log("-----canceled-====")
              }}/>
              </View>
            </View>
          );
        },
      });
      return true;
    });

    return () => exitApp.remove();
  }, []);
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

const portalChoiceStyles = StyleSheet.create({
  alertContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default PortalChoice;
