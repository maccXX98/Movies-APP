import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../utils/firebase.js";
import sharp from "sharp";

export const uploadImage = async (file, width = 200, height = 200) => {
  try {
    if (!file.mimetype.startsWith("image/")) {
      throw new Error("Solo se permiten archivos de imagen");
    }

    const buffer = await sharp(file.buffer).resize({ width, height, fit: "cover" }).toBuffer();

    const timestamp = Date.now();
    const storageRef = ref(storage, `files/${file.originalname}_${timestamp}`);
    const metadata = { contentType: file.mimetype };

    await uploadBytesResumable(storageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen:", error.message);
    throw new Error(`Error al subir la imagen: ${error.message}`);
  }
};
