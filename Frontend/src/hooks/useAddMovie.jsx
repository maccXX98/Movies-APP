import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMoviesStore } from "../store/moviesStore";
import { createMovieData } from "../utils/createMovieData";

/**
 * Hook personalizado para añadir una nueva película
 * @param {Function} resetForm - Función para resetear el formulario
 * @returns {UseMutationResult} Objeto de mutación de TanStack Query
 */
export const useAddMovie = (resetForm) => {
  const queryClient = useQueryClient();
  const addMovie = useMoviesStore((state) => state.addMovie);

  return useMutation({
    mutationFn: async ({ movie, file }) => {
      try {
        const formData = createMovieData(movie, file);
        const response = await fetch("http://localhost:5000/api/movies", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al guardar la película");
        }

        return response.json();
      } catch (error) {
        console.error("Error al añadir película:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      addMovie(data);
      queryClient.invalidateQueries(["movies"]);
      resetForm();
    },
  });
};
