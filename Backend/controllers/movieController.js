import { Movie } from "../models/movie.js";
import { uploadImage } from "../utils/uploadFile.js";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../utils/firebase.js";

// Crear una nueva película
export const createMovie = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description || !req.files.image) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const imageUrl = await uploadImage(req.files.image[0]);
    const movie = await Movie.create({
      title: req.body.title,
      description: req.body.description,
      image: imageUrl,
    });
    res.status(201).json({ message: "Película creada exitosamente", movie });
  } catch (error) {
    res.status(500).json({ error: "Error al crear la película", details: error.message });
  }
};

// Obtener todas las películas
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [["id", "DESC"]], // Ordenar por id de forma descendente
    });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las películas", details: error.message });
  }
};

// Obtener una película por ID
export const getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la película", details: error.message });
  }
};

// Actualizar parcialmente una película con PATCH
export const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar la película por ID
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    // Procesar una nueva imagen si se envía
    if (req.files && req.files.image) {
      // Eliminar la imagen existente de Firebase Storage si es necesario
      if (movie.image) {
        const imageRef = ref(storage, movie.image);
        await deleteObject(imageRef);
      }

      // Subir la nueva imagen
      const imageUrl = await uploadImage(req.files.image[0]);
      movie.image = imageUrl;
    }

    // Actualizar solo los campos que se proporcionan
    if (req.body.title !== undefined) movie.title = req.body.title;
    if (req.body.description !== undefined) movie.description = req.body.description;

    // Guardar los cambios en la base de datos
    await movie.save();

    res.status(200).json({ message: "Película actualizada exitosamente", movie });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la película", details: error.message });
  }
};

// Eliminar una película
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    const imageRef = ref(storage, movie.image);
    await deleteObject(imageRef);
    await movie.destroy();
    res.status(200).json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la película", details: error.message });
  }
};
