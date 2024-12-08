import { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !formData.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email), // Validación de email
      message: !formData.message.trim(),
    };

    setErrors(newErrors);

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      console.log("Mensaje enviado:", formData);
      setFormData({ name: "", email: "", message: "" }); // Limpiar el formulario tras el envío
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: "auto", textAlign: "center" }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Contacto
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          helperText={errors.name ? "El nombre es requerido" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#0072ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#005bb5",
              },
            },
          }}
        />

        <TextField
          label="Correo Electrónico"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={errors.email ? "Ingrese un correo válido" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#0072ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#005bb5",
              },
            },
          }}
        />

        <TextField
          label="Mensaje"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          helperText={errors.message ? "El mensaje no puede estar vacío" : ""}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#0072ff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#005bb5",
              },
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            py: 1.2,
            backgroundColor: "#0072ff",
            "&:hover": {
              backgroundColor: "#005bb5",
            },
          }}
        >
          Enviar Mensaje
        </Button>
      </Stack>
    </Box>
  );
};
