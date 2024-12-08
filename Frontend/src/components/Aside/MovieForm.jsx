import { useState } from "react";
import { TextField, Button, Box, FormHelperText } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import PropTypes from "prop-types";

const INPUT_STYLES = {
  marginBottom: 2,
  "& .MuiOutlinedInput-root": {
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    },
    "&.Mui-focused": {
      "& fieldset": {
        borderColor: "#0072ff",
      },
    },
  },
};

export const MovieForm = ({
  movie,
  setMovie,
  handleFileChange,
  fileInputRef,
  filePreview,
  onSubmit,
  isEditing,
  onCancelEdit,
}) => {
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    image: false,
  });

  const validateFields = () => {
    const newErrors = {
      title: !movie.title.trim(),
      description: !movie.description.trim(),
      image: !filePreview,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateFields()) {
      onSubmit(event);
    }
  };

  const handleImageChange = (event) => {
    handleFileChange(event);
    setErrors((prev) => ({ ...prev, image: false }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        fullWidth
        label="Título"
        value={movie.title}
        onChange={(e) => setMovie({ ...movie, title: e.target.value })}
        error={errors.title}
        helperText={errors.title ? "El título es requerido" : ""}
        sx={INPUT_STYLES}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Descripción"
        value={movie.description}
        onChange={(e) => setMovie({ ...movie, description: e.target.value })}
        margin="normal"
        error={errors.description}
        helperText={errors.description ? "La descripción no puede estar vacía" : ""}
        sx={INPUT_STYLES}
      />

      <Button
        component="label"
        variant="contained"
        color="primary"
        startIcon={<PhotoCamera />}
        sx={{
          mt: 2,
          width: "100%",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        Agregar Imagen
        <input type="file" hidden accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
      </Button>

      {errors.image && (
        <FormHelperText
          error
          sx={{
            textAlign: "center",
            mt: 1,
            fontSize: "0.75rem",
          }}
        >
          La imagen es obligatoria
        </FormHelperText>
      )}

      {filePreview && (
        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src={filePreview}
            alt="Vista previa"
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 1,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Box>
      )}

      <Button
        type="submit"
        variant="contained"
        color={isEditing ? "primary" : "success"}
        fullWidth
        sx={{
          mt: 2,
          transition: "background-color 0.3s ease, transform 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: 1,
          "&:hover": {
            backgroundColor: isEditing ? "#1565c0" : "#2e7d32",
            transform: "scale(1.05)",
          },
        }}
      >
        {isEditing ? <EditIcon /> : <SaveIcon />}
        {isEditing ? "Editar" : "Guardar"}
      </Button>

      {isEditing && (
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={onCancelEdit}
          sx={{
            mt: 1,
            transition: "transform 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        >
          <CancelIcon />
          Cancelar
        </Button>
      )}
    </Box>
  );
};

MovieForm.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  setMovie: PropTypes.func.isRequired,
  handleFileChange: PropTypes.func.isRequired,
  fileInputRef: PropTypes.object.isRequired,
  filePreview: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  onCancelEdit: PropTypes.func,
};
