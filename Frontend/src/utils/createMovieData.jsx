/**
 * Crea un objeto FormData con los datos de la película
 * @param {{ title: string, description: string }} movie - Objeto con los datos de la película
 * @param {File} file - Archivo de imagen de la película
 * @returns {FormData} Objeto FormData con los datos de la película
 * @throws {Error} Si faltan datos requeridos
 */
export const createMovieData = (movie, file) => {
  try {
    // Validar datos requeridos
    if (!movie?.title || !movie?.description || !file) {
      throw new Error("Faltan datos requeridos para crear la película");
    }

    // Crear y poblar FormData
    const formData = new FormData();
    formData.append("title", movie.title.trim());
    formData.append("description", movie.description.trim());
    formData.append("image", file);

    return formData;
  } catch (error) {
    console.error("Error al crear FormData:", error);
    throw error;
  }
};
