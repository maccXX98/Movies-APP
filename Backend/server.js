/* eslint-disable no-undef */
import express, { json, urlencoded } from "express";
import { connectDB } from "./database/db.js";
import movieRoutes from "./routes/movieRoutes.js";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf-8"));

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

// Función para configurar middleware
const configureMiddleware = (app) => {
  app.use(cors({ origin: CORS_ORIGIN }));
  app.use(morgan("dev"));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.use(compression());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // Limita cada IP a 100 solicitudes por ventana de 15 minutos
    })
  );
};

// Configurar middleware
configureMiddleware(app);

// Conectar a la base de datos
connectDB();

// Rutas
app.use("/api", movieRoutes);

// Documentación de API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware para manejar errores globales
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor" });
});

// Escuchar en el puerto configurado
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
