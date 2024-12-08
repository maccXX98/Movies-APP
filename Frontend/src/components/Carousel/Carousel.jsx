import { useState, useEffect } from "react";
import Slider from "react-slick";
import { useMoviesStore } from "../../store/moviesStore";
import { Box, Typography, Skeleton, Stack, Snackbar, Alert } from "@mui/material";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { MovieCard } from "./MovieCard";
import { getCarouselSettings } from "../../settings/carouselSettings";
import { useDeleteMovie } from "../../hooks/useDeleteMovie";
//import { useEditMovie } from "../../hooks/useEditMovie";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

export const Carousel = () => {
  const movies = useMoviesStore((state) => state.movies);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [setMovieToEdit] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [deleteSuccessSnackbar, setDeleteSuccessSnackbar] = useState({ open: false, message: "", severity: "success" });

  const { mutate: deleteMovie } = useDeleteMovie();

  const settings = getCarouselSettings();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDeleteSuccessSnackbar = () => {
    setDeleteSuccessSnackbar({ ...deleteSuccessSnackbar, open: false });
  };

  const handleDeleteClick = (movie) => {
    setMovieToDelete(movie);
    setOpenDialog(true);
  };

  const handleEditClick = (movie) => {
    setMovieToEdit(movie);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMovieToDelete(null);
  };

  const handleConfirmDelete = () => {
    deleteMovie(movieToDelete.id);
    setDeleteSuccessSnackbar({
      open: true,
      message: `La película "${movieToDelete.title}" ha sido eliminada con éxito.`,
      severity: "success",
    });
    handleCloseDialog();
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Stack spacing={2}>
          <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
          <Skeleton variant="text" height={30} width="80%" />
          <Skeleton variant="text" height={20} width="60%" />
        </Stack>
      </Box>
    );
  }

  if (movies.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          textAlign: "center",
          color: "#666",
        }}
      >
        <ReportProblemIcon sx={{ fontSize: 50, color: "#0072ff", mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 500 }}>
          No hay películas disponibles
        </Typography>
        <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
          Agrega una nueva película para ver aquí.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onEdit={() => handleEditClick(movie)}
            onDelete={() => handleDeleteClick(movie)}
          />
        ))}
      </Slider>

      <ConfirmationDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        description={`¿Estás seguro de que deseas eliminar la película "${movieToDelete?.title}"?`}
      />

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Snackbar open={deleteSuccessSnackbar.open} autoHideDuration={6000} onClose={handleCloseDeleteSuccessSnackbar}>
        <Alert
          onClose={handleCloseDeleteSuccessSnackbar}
          severity={deleteSuccessSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {deleteSuccessSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
