import ImageResizer from "react-native-image-resizer";

const fetchImageAsBlob = async (uri) => {
    const response = await fetch(uri);
    return response.blob();
  };

  // Helper function to convert a Blob to base64
  const blobToBase64 = async (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1]; // Get base64 part
        resolve(base64String);
      };
      reader.readAsDataURL(blob);
    });
  };

  // Function to handle both local and remote URIs
 export const compressAndConvertToBase64 = async (uri) => {
    try {
      let localUri = uri;

      // Check if the URI is remote
      if (uri.startsWith('http')) {
        const blob = await fetchImageAsBlob(uri);
        // Create a local temporary file from the remote blob
        const tempUri = Platform.OS === 'ios' ? blob : URL.createObjectURL(blob);
        localUri = tempUri;
      }

      // Resize the image
      const resizedImage = await ImageResizer.createResizedImage(
        localUri,
        800, // desired width
        600, // desired height
        'JPEG', // format
        80, // quality (0 to 100)
        0 // rotation
      );

      // Convert the resized image to base64
      const response = await fetch(resizedImage.uri);
      const blob = await response.blob();
      return await blobToBase64(blob);
    } catch (err) {
      console.error('Error resizing and converting image:', err);
      throw err;
    }
  };
