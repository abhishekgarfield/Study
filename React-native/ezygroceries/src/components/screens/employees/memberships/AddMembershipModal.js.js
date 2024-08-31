import React, {useContext, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {black, white} from '../../../Common/colors';
import {AntDesign} from '../../../../assets/icons';
import {Title} from '../../../../assets/fonts';
import axios from 'axios';
import {addMembership} from '../../../../apis/api';
import {DataContext} from '../../../../../store';
import {dispMessage} from '../../../Common/flashMessages';

const AddMembershipModal = ({
  addMembershipModal,
  setAddMembershipModal,
  handleMembershipSave,
}) => {
  const dataContext = useContext(DataContext);
  console.log('--------data context -----', dataContext.currentUser);
  const {shop_id, auth_token} = dataContext.currentUser;
  const [totalAmount, setTotalAmount] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    console.log('Total Amount:', totalAmount);
    console.log('Email:', email);
    axios
      .post(
        addMembership,
        {
          email,
          totalAmount,
          shop_id,
        },
        {
          headers: {
            ezyGroceries_header_key: auth_token,
          },
        },
      )
      .then(res => {
        console.log('---res-----', res.data);
        if (res.status == 404) {
          dispMessage('Email ot found');
        } else {
          handleMembershipSave(res.data[0]);

        }
      })
      .catch(err => {
        if (err.response.status == 401) {
          dispMessage('danger', 'Error', err.response.data);
        } else if (err.response.status == 404) {
          dispMessage('danger', 'Error', 'Email not found');
        } else {
          dispMessage('danger', 'Error', err.response.data);
        }
        console.log('----errr---', err.response.data);
      });
  };

  return (
    <Modal
      visible={addMembershipModal}
      animationType="slide"
      transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              console.log('----------1111--------');
              setAddMembershipModal(!addMembershipModal);
            }}>
            <AntDesign name="close" size={24} color={black} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Add Membership</Text>
          <TextInput
            style={styles.input}
            placeholder="Total Amount"
            keyboardType="numeric"
            value={totalAmount}
            onChangeText={setTotalAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: white,
    borderRadius: 10,
    shadowColor: black,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: -12,
    right: -12,
    zIndex: 1,
    padding: 10,
    backgroundColor: white,
    borderRadius: 20,
    elevation: 2,
  },
  modalTitle: {
    fontFamily: Title,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    borderColor: black,
    borderWidth: 1,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default AddMembershipModal;
