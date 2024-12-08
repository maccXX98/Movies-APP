import { Snackbar, Alert } from "@mui/material";
import PropTypes from "prop-types";

// Constantes para la configuración del Snackbar
const SNACKBAR_CONFIG = {
  autoHideDuration: 4000,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
};

// Estilos para el Alert
const alertStyles = {
  width: "100%",
  borderRadius: "8px",
  "& .MuiAlert-icon": {
    fontSize: "1.25rem",
  },
};

export const CustomSnackbar = ({ open = false, message = "", severity = "info", onClose = () => {} }) => (
  <Snackbar
    open={open}
    autoHideDuration={SNACKBAR_CONFIG.autoHideDuration}
    onClose={onClose}
    anchorOrigin={SNACKBAR_CONFIG.anchorOrigin}
  >
    <Alert onClose={onClose} severity={severity} variant="filled" elevation={6} sx={alertStyles}>
      {message}
    </Alert>
  </Snackbar>
);

CustomSnackbar.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
  onClose: PropTypes.func,
};
