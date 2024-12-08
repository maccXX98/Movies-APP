import { create } from "zustand";

// Definir tipos de estado
const INITIAL_STATE = {
  movies: [],
  movieToEdit: null, // Agregamos esta línea
};

/**
 * Store para gestionar el estado global de las películas
 * Utiliza Zustand para manejar el estado y las acciones
 */
export const useMoviesStore = create((set) => ({
  // Estado inicial
  ...INITIAL_STATE,

  // Acciones
  setMovies: (movies) => set({ movies }),

  addMovie: (movie) =>
    set((state) => ({
      movies: [...state.movies, movie],
    })),

  updateMovie: (updatedMovie) =>
    set((state) => ({
      movies: state.movies.map((movie) => (movie.id === updatedMovie.id ? updatedMovie : movie)),
    })),

  removeMovie: (movieId) =>
    set((state) => ({
      movies: state.movies.filter((movie) => movie.id !== movieId),
    })),

  setMovieToEdit: (movie) => set({ movieToEdit: movie }), // Nueva acción

  // Acción para reiniciar el estado
  reset: () => set(INITIAL_STATE),
}));
