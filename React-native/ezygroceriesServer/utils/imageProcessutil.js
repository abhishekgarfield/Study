import { Storage } from "@google-cloud/storage";
import fetch from "node-fetch"; // Ensure you have node-fetch installed
import * as dotenv from "dotenv";

dotenv.config();

const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS; // Replace with the path to your JSON key file
const storage = new Storage({ keyFilename });
const bucket = storage.bucket("ezygroceries_shop_items");

// Helper function to convert base64 to Buffer
const base64ToBuffer = (base64) => {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
  return Buffer.from(base64Data, "base64");
};

// Helper function to upload image to Google Cloud Storage
const uploadImageToStorage = async (fileName, fileBuffer) => {
  const file = bucket.file(fileName);
  await file.save(fileBuffer, {
    contentType: "image/jpeg", // Adjust according to image type
  });
  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

// Main function to handle image uploads
const handleImageUploads = async (imageUrls) => {
  const uploadPromises = imageUrls.map(async (url, index) => {
    if (!url.startsWith("http")) {
      // Handle base64 images
      const fileName = `base64-image-${index}.jpg`; // Or use a more dynamic name
      const fileBuffer = base64ToBuffer(url);
      const fileUrl = await uploadImageToStorage(fileName, fileBuffer);
      return fileUrl;
    } else if (
      url.startsWith("https://storage.googleapis.com/ezygroceries_shop_items")
    ) {
      // Handle already uploaded Google Cloud Storage URLs
      return url;
    } else {
      // Handle remote URLs
      const fileName = `remote-image-${index}.jpg`; // Or use a more dynamic name
      const response = await fetch(url);

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`Failed to fetch image from ${url}. Status: ${response.status}`);
      }

      // Convert response to arrayBuffer
      const arrayBuffer = await response.arrayBuffer();
      // Convert arrayBuffer to Buffer
      const fileBuffer = Buffer.from(arrayBuffer);

      // Upload image to Google Cloud Storage
      const fileUrl = await uploadImageToStorage(fileName, fileBuffer);
      return fileUrl;
    }
  });

  return Promise.all(uploadPromises);
};

export default handleImageUploads;
