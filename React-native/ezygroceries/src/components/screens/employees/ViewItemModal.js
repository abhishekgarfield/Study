import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '../../../assets/icons';

const ViewItemModal = ({ modalVisibleData, setModalVisibleData, addItem }) => {
  const { active, item } = modalVisibleData;
  console.log("------------------",modalVisibleData)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={active}
      onRequestClose={() => setModalVisibleData({ ...modalVisibleData, active: false })}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Item Details</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisibleData({ ...modalVisibleData, active: false })}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemBrand}>Brand: {item.brand_name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>

            <Text style={styles.itemPrice}>Price: {item.price}/-</Text>
            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>

            <Text style={styles.itemAvailability}>
              {item.is_available ? 'Available' : 'Not Available'}
            </Text>

            <ScrollView horizontal={true} style={styles.imagePreviewContainer}>
              {item.image_urls && item.image_urls.length > 0 ? (
                item.image_urls.map((url, index) => (
                  <Image key={index} source={{ uri: url }} style={styles.imagePreview} />
                ))
              ) : (
                <Text>No images available</Text>
              )}
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: Dimensions.get('window').height * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemBrand: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  itemAvailability: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ViewItemModal;
