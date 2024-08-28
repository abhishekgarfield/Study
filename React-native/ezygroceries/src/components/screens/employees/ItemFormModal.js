import React, {useState, useEffect, useContext} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Ionicons, MaterialIcons} from '../../../assets/icons';
import {black, fadedBlack, white} from '../../Common/colors';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';
import {createshopitem, updateshopitem} from '../../../apis/api';
import {dispMessage} from '../../Common/flashMessages';
import LoaderKit from 'react-native-loader-kit';
import {DataContext} from '../../../../store';
import { compressAndConvertToBase64 } from '../../../helpers/imageConvertor';

const ItemFormModal = ({itemModal, setItemModal, updateShopItems}) => {
  const dataContext = useContext(DataContext);
  console.log("------------",itemModal.item)
  const {user_id, auth_token, shop_id} = dataContext.currentUser;
  const [disable, setDisable] = useState(false);
  const [itemData, setItemData] = useState(
    itemModal.is_edit
      ? itemModal.item
      : {
          name: '',
          description: '',
          is_available: false,
          price: '',
          brand_name: '',
          quantity: '',
          image_urls: [],
          barcode: '',
        },
  );

  const [scannerModalVisible, setScannerModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const [barcodes, setBarcodes] = useState([]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };

    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0) {
      axios
        .get(
          `https://big-product-data.p.rapidapi.com/gtin/${barcodes[0].value}`,
          {
            headers: {
              'x-rapidapi-host': 'big-product-data.p.rapidapi.com',
              'x-rapidapi-key': `${process.env.BAR_CODE_KEY}`,
            },
          },
        )
        .then(async res => {
          console.log('Product Data:', res.data);
          if (res.data.error) {
            Alert.alert('Error', res.data.error);
          } else {
            let imageData = await compressAndConvertToBase64(res.data.stores[0].image)
            console.log('---res.data---', res.data);
            if (res.data) {
              setItemData(prevData => ({
                ...prevData,
                barcode: barcodes[0].value,
                name: res.data.properties?.title[0],
                description: res.data.properties?.description,
                is_available: false,
                price:
                  res.data.stores.length > 0
                    ? res.data.stores[0]?.price?.price.toString()
                    : '0',
                brand_name: res.data.properties?.brand,
                quantity: res.data.properties?.weight + 'g',
                image_urls:
                  res.data.stores.length > 0 ? [imageData] : [],
              }));
            }
          }
        })
        .catch(err => console.error('API Error:', err));
      setScannerModalVisible(false); // Close the scanner modal
    }
  }, [barcodes]);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error(
          'Image Picker error: ',
          response.errorCode,
          response.errorMessage,
        );
        Alert.alert('Error', `Image Picker Error: ${response.errorMessage}`);
      } else if (response.assets) {
        try {
          const compressedUris = await Promise.all(
            response.assets.map(async image => await compressAndConvertToBase64(image.uri)),
          );
          console.log("----compressed uris ---",compressedUris)
          setItemData(prevData => ({
            ...prevData,
            image_urls: [...prevData.image_urls, ...compressedUris],
          }));
        } catch (err) {
          console.error('Image processing error: ', err);
          Alert.alert(
            'Error',
            'There was an error processing the image. Please try again.',
          );
        }
      }
    });
  };

  const captureImage = () => {
    launchCamera({mediaType: 'photo'}, async response => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorCode) {
        console.error(
          'Camera error: ',
          response.errorCode,
          response.errorMessage,
        );
        Alert.alert('Error', `Camera Error: ${response.errorMessage}`);
      } else if (response.assets) {
        try {
          const compressedUris = await Promise.all(
            response.assets.map(async image => await compressAndConvertToBase64(image.uri)),
          );
          setItemData(prevData => ({
            ...prevData,
            image_urls: [...prevData.image_urls, ...compressedUris],
          }));
        } catch (err) {
          console.error('Image processing error: ', err);
          Alert.alert(
            'Error',
            'There was an error processing the image. Please try again.',
          );
        }
      }
    });
  };

  const handleInputChange = (key, value) => {
    setItemData(prevData => ({...prevData, [key]: value}));
  };

  const handleFormSubmit = () => {
    console.log('---------hello');
    setDisable(true);
    console.log('Form Submitted', itemData);
    axios
      .post(
        itemModal.is_edit ? updateshopitem : createshopitem,
        {
          shop_item: {...itemData,shop_id},
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ezyGroceries_header_key: auth_token,
          },
        },
      )
      .then(res => {
        setDisable(false);
        console.log('----res-----', res.data);
        updateShopItems(res.data.data)
        setItemModal({...itemModal, active: false});
        dispMessage('danger', 'Error', err.response.data);

      })
      .catch(err => {
        setDisable(false);
        setItemModal({...itemModal, active: false});
        dispMessage('danger', 'Error', err.response.data);
      });
  };

  const codeScanner = useCodeScanner(
    {
      codeTypes: ['qr', 'ean-13'],
      onCodeScanned: codes => {
        console.log(`Scanned ${codes.length} codes!, ${codes}`, {
          type: codes[0].type,
          value: codes[0].value,
        });
        setBarcodes([{type: codes[0].type, value: codes[0].value}]);
      },
    },
    [],
  );

  return (
    <Modal
      style={{zIndex: 15}}
      animationType="slide"
      transparent={true}
      visible={itemModal.active}
      onRequestClose={() =>
        setItemModal({
          ...itemModal,
          active: !itemModal.active,
          item: {},
          is_edit: false,
        })
      }>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Header with Add Item Title and Icons */}
          <View style={styles.header}>
            {!itemModal.is_edit && (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setScannerModalVisible(true)}>
                <MaterialIcons name="qr-code-scanner" size={28} color={black} />
              </TouchableOpacity>
            )}
            <Text style={styles.modalTitle}>
              {itemModal.is_edit ? 'Edit Item' : 'Add New Item'}
            </Text>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => {
                setItemData({
                  name: '',
                  description: '',
                  is_available: false,
                  price: '',
                  brand_name: '',
                  quantity: '',
                  image_urls: [],
                  barcode: '',
                });
                setItemModal({
                  ...itemModal,
                  active: false,
                  item: {},
                  is_edit: false,
                });
              }}>
              <Ionicons name="close" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={itemData.name}
              onChangeText={text => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={itemData.description}
              onChangeText={text => handleInputChange('description', text)}
              multiline={true}
            />
            <View style={styles.switchContainer}>
              <Text style={{paddingLeft: 5}}>Available:</Text>
              <Switch
                style={{transform: [{scaleX: 0.65}, {scaleY: 0.65}]}}
                trackColor={{false: '#767577', true: '#4CAF50'}}
                thumbColor={itemData.is_available ? '#FFFFFF' : '#FFFFFF'}
                onValueChange={value =>
                  handleInputChange('is_available', value)
                }
                value={itemData.is_available == 1 || itemData.is_available}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={itemData.price}
              onChangeText={text => handleInputChange('price', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Brand Name"
              value={itemData.brand_name}
              onChangeText={text => handleInputChange('brand_name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Quantity"
              value={itemData.quantity.toString()}
              onChangeText={text => handleInputChange('quantity', text)}
              keyboardType="numeric"
            />

            <View style={styles.imagePickerOptions}>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={pickImage}>
                <Text style={styles.imagePickerText}>Pick from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={captureImage}>
                <Text style={styles.imagePickerText}>Capture Image</Text>
              </TouchableOpacity>
            </View>

            {itemData.barcode ? (
              <View style={styles.barcodeContainer}>
                <Text>Scanned Code: {itemData.barcode}</Text>
              </View>
            ) : null}

            {itemData.image_urls.length > 0 ? (
              <ScrollView
                horizontal={true}
                style={styles.imagePreviewContainer}>
                {itemData.image_urls.map((image, index) =>
                (

                  <Image
                    key={index}
                    source={{uri: image.startsWith('http') ? image : `data:image/jpeg;base64,${image}`}}
                    style={styles.imagePreview}
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            ) : null}
            <TouchableOpacity
              disabled={disable}
              style={styles.submitButton}
              onPress={handleFormSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
              {disable && (
                <LoaderKit
                  style={{width: 25, height: 25, marginLeft: 10}}
                  name={'BallPulse'}
                  color={white}
                />
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
      {scannerModalVisible && (
        <Modal
          visible={scannerModalVisible}
          animationType="slide"
          onRequestClose={() => setScannerModalVisible(false)}>
          <View style={styles.scannerContainer}>
            {device ? (
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                // frameProcessor={frameProcessor}
                codeScanner={codeScanner}
                frameProcessorFps={5}
              />
            ) : (
              <Text>No camera permissions granted.</Text>
            )}
            <TouchableOpacity
              style={styles.scannerCloseButton}
              onPress={() => setScannerModalVisible(false)}>
              <Text style={styles.scannerCloseText}>Close Scanner</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  iconButton: {
    padding: 5,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imagePickerButton: {
    backgroundColor: '#81b0ff',
    padding: 10,
    borderRadius: 5,
    flexBasis: '49%',
    alignItems: 'center',
  },
  imagePickerText: {
    color: 'white',
  },
  imagePreviewContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  imagePreview: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  noImagesContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
    borderWidth: 0.2,
    borderColor: fadedBlack,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cameraText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeScannerButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeScannerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  barcodeContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ItemFormModal;
