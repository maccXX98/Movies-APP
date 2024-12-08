import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMoviesStore } from "../store/moviesStore";

export const useEditMovie = (setSnackbar) => {
  const queryClient = useQueryClient();
  const updateMovie = useMoviesStore((state) => state.updateMovie);

  return useMutation({
    mutationFn: async ({ movieId, updatedData }) => {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: "PATCH",
        body: updatedData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al actualizar la película");
      }

      return response.json();
    },
    onSuccess: (data) => {
      updateMovie(data);
      queryClient.invalidateQueries(["movies"]);
      setSnackbar({ open: true, message: "Película actualizada exitosamente", severity: "success" });
    },
    onError: (error) => {
      console.error("Error en la actualización de la película:", error.message);
      setSnackbar({ open: true, message: error.message || "Error al actualizar la película", severity: "error" });
    },
  });
};
