import { useState, useRef, useCallback } from "react";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const useFileHandler = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const fileInputRef = useRef(null);

  const validateFile = useCallback((file, setError) => {
    if (!file) return false;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      setError?.("El archivo debe ser una imagen (JPEG, PNG o GIF)");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError?.("El archivo no debe superar los 5MB");
      return false;
    }

    return true;
  }, []);

  const resetFile = useCallback(() => {
    setFile(null);
    setFilePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleFileChange = useCallback(
    (event, setError) => {
      const selectedFile = event.target.files[0];

      if (!selectedFile) {
        resetFile();
        return;
      }

      if (!validateFile(selectedFile, setError)) {
        resetFile();
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
        setFile(selectedFile);
        setError?.(false);
      };
      reader.onerror = () => {
        setError?.("Error al leer el archivo");
        resetFile();
      };
      reader.readAsDataURL(selectedFile);
    },
    [resetFile, validateFile]
  );

  return {
    file,
    filePreview,
    fileInputRef,
    handleFileChange,
    resetFile,
    isValidFile: validateFile,
  };
};
