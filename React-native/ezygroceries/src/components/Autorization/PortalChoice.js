import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PortalChoiceBackground from './portalChoiceBackground';
const PortalChoice = () => {
  return (
    <PortalChoiceBackground>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 20,
          paddingHorizontal: 40,
          justifyContent: 'space-between',
          borderRadius: 5,
          margin: 10,
          marginBottom: 5,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 1,
            fontSize: 20,
          }}>
          CUSTOMER
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            letterSpacing: 1,
            fontSize: 20,
          }}>
          >
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: 20,
          paddingHorizontal: 40,
          justifyContent: 'space-between',
          borderRadius: 5,
          margin: 10,
          marginTop: 0,
        }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '600',
            letterSpacing: 1,
            fontSize: 20,
          }}>
          SHOPPER
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: '500',
            letterSpacing: 1,
            fontSize: 20,
          }}>
          >
        </Text>
      </TouchableOpacity>
    </PortalChoiceBackground>
  );
};

const styles = StyleSheet.create({
  inputField: {
    display: 'flex',
    borderColor: 'black',
    borderWidth: 5,
    height: 50,
    borderRadius: 10,
    backgroundColor: 'lightgray',
  },
});
export default PortalChoice;

