import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { MovieForm } from "./MovieForm";
import { CustomSnackbar } from "./CustomSnackbar";
import { validateMovieForm } from "../../utils/validateMovieForm";
import { useFileHandler } from "../../hooks/useFileHandler";
import { useAddMovie } from "../../hooks/useAddMovie";
import { useEditMovie } from "../../hooks/useEditMovie";
import { useMoviesStore } from "../../store/moviesStore";

// Estilos extraídos como constantes para mejor mantenibilidad
const INITIAL_MOVIE_STATE = {
  title: "",
  description: "",
  image: "",
};

const INITIAL_ERRORS_STATE = {
  title: false,
  description: false,
  image: false,
};

const boxStyles = {
  p: 3,
  maxWidth: 500,
  margin: "auto",
  backgroundColor: "#f8f9fa",
  borderRadius: "8px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
};

const titleStyles = {
  mb: 3,
  color: "#0072ff",
  fontWeight: 700,
};

export const Aside = () => {
  // Estados inicializados con constantes
  const movieToEdit = useMoviesStore((state) => state.movieToEdit);
  const setMovieToEdit = useMoviesStore((state) => state.setMovieToEdit);
  const [movie, setMovie] = useState(INITIAL_MOVIE_STATE);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errors, setErrors] = useState(INITIAL_ERRORS_STATE);

  // Custom hook para manejo de archivos
  const { file, filePreview, fileInputRef, handleFileChange, resetFile, setFilePreview } = useFileHandler();

  // Función para resetear el formulario
  const resetForm = () => {
    setMovie(INITIAL_MOVIE_STATE);
    resetFile();
  };

  useEffect(() => {
    if (movieToEdit) {
      setMovie(movieToEdit);
      if (movieToEdit.image) {
        setFilePreview(movieToEdit.image);
      }
    } else {
      resetForm();
    }
  }, [movieToEdit, resetForm, setFilePreview]);

  const addMutation = useAddMovie(resetForm);
  const editMutation = useEditMovie(() => {
    resetForm();
    setMovieToEdit(null);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentFile = file || (typeof movieToEdit.image === "string" ? null : movieToEdit.image);
    const formErrors = validateMovieForm(movie, currentFile);
    setErrors(formErrors);

    if (Object.values(formErrors).some(Boolean)) {
      setSnackbarOpen(true);
      return;
    }

    if (movieToEdit) {
      const formData = new FormData();
      formData.append("title", movie.title.trim());
      formData.append("description", movie.description.trim());
      if (file) {
        formData.append("image", file);
      }
      editMutation.mutate({ movieId: movieToEdit.id, updatedData: formData });
    } else {
      addMutation.mutate({ movie, file });
    }
  };

  const handleCancelEdit = () => {
    setMovieToEdit(null);
    resetForm();
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <aside>
      <Box sx={boxStyles}>
        <Typography variant="h4" component="h3" sx={titleStyles}>
          {movieToEdit ? "Editar Película" : "Añadir Película"}
        </Typography>
        <MovieForm
          movie={movie}
          setMovie={setMovie}
          handleFileChange={(e) => handleFileChange(e, (isError) => setErrors((prev) => ({ ...prev, image: isError })))}
          fileInputRef={fileInputRef}
          filePreview={filePreview}
          onSubmit={handleSubmit}
          errors={errors}
          isEditing={Boolean(movieToEdit)}
          onCancelEdit={handleCancelEdit}
        />
        <CustomSnackbar
          open={snackbarOpen}
          message={
            addMutation.isError || editMutation.isError
              ? "Error al guardar la película"
              : "La película se ha guardado exitosamente."
          }
          severity={addMutation.isError || editMutation.isError ? "error" : "success"}
          onClose={handleSnackbarClose}
        />
      </Box>
    </aside>
  );
};
