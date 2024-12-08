/**
 * Valida los campos del formulario de película
 * @param {{ title: string, description: string }} movie - Objeto con los datos de la película
 * @param {File} file - Archivo de imagen
 * @returns {{ title: boolean, description: boolean, image: boolean }} Objeto con los errores de validación
 */
export const validateMovieForm = (movie, file) => {
  if (!movie) {
    return {
      title: true,
      description: true,
      image: true,
    };
  }

  const errors = {
    title: false,
    description: false,
    image: false,
  };

  // Validar título
  const titleTrimmed = movie.title?.trim() || "";
  errors.title = titleTrimmed.length === 0;

  // Validar descripción
  const descriptionTrimmed = movie.description?.trim() || "";
  errors.description = descriptionTrimmed.length === 0;

  // Validar archivo de imagen
  errors.image = !file;

  return errors;
};
