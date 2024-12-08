import multer from "multer";

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

// Configuración de límites y filtros
const limits = {
  fileSize: 5 * 1024 * 1024, // 5 MB
};

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen"), false);
  }
};

// Configuración de multer
export const upload = multer({
  storage,
  limits,
  fileFilter,
});

// Middleware para manejar errores de subida de archivos
export const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "Error de subida de archivos", details: err.message });
  } else if (err) {
    return res.status(400).json({ error: "Error de validación de archivos", details: err.message });
  }
  next();
};
