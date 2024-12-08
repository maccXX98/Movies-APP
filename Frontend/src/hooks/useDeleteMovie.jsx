import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMoviesStore } from "../store/moviesStore";

export const useDeleteMovie = () => {
  const queryClient = useQueryClient();
  const removeMovie = useMoviesStore((state) => state.removeMovie);

  return useMutation({
    mutationFn: async (movieId) => {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la película");
    },
    onSuccess: (_, movieId) => {
      removeMovie(movieId);
      queryClient.invalidateQueries(["movies"]);
    },
  });
};
