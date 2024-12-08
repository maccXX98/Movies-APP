import { useEffect, useState } from "react";
import { useMoviesStore } from "../store/moviesStore";

export const useFetchMovies = () => {
  const { setMovies } = useMoviesStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/movies");
        if (!response.ok) {
          throw new Error("Error al obtener las películas");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [setMovies]);

  return { loading, error };
};
