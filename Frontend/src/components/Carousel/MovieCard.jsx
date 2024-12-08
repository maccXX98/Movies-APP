import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import Truncate from "react-truncate";

export const MovieCard = ({
  movie = {
    id: "",
    title: "Sin título",
    description: "Sin descripción",
    image: "placeholder-image-url.jpg",
  },
  onEdit = () => {},
  onDelete = () => {},
}) => (
  <Box
    sx={{
      textAlign: "center",
      p: 1,
      mb: 2,
      borderRadius: "8px",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "scale(1.05)",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    <img
      src={movie.image || "placeholder-image-url.jpg"}
      alt={`Imagen de ${movie.title || "película"}`}
      style={{ width: "100%", height: "auto", borderRadius: "8px" }}
    />
    <Typography variant="h6" sx={{ mt: 1 }}>
      <Truncate lines={2} ellipsis={<span>...</span>}>
        {movie.title || "Sin título"}
      </Truncate>
    </Typography>
    <Typography variant="body2" sx={{ mt: 1 }}>
      <Truncate lines={4} ellipsis={<span>...</span>}>
        {movie.description || "Sin descripción"}
      </Truncate>
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mr: 1 }}
        onClick={() => onEdit(movie)}
        aria-label={`Editar ${movie.title || "película"}`}
      >
        Editar
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => onDelete(movie)}
        aria-label={`Borrar ${movie.title || "película"}`}
      >
        Borrar
      </Button>
    </Box>
  </Box>
);

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
  }),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default MovieCard;
