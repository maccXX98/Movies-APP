import PropTypes from "prop-types";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export const ConfirmationDialog = ({ open, onClose, onConfirm, title, description }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Agregar validación de PropTypes
ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired, // Asegurarse de que 'open' sea un booleano y sea requerido
  onClose: PropTypes.func.isRequired, // 'onClose' debe ser una función y es requerida
  onConfirm: PropTypes.func.isRequired, // 'onConfirm' también debe ser una función requerida
  title: PropTypes.string.isRequired, // 'title' es un string requerido
  description: PropTypes.string.isRequired, // 'description' es un string requerido
};
