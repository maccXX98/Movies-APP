import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
        color: "#fff",
        py: 3,
        mt: "auto",
        boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        © {new Date().getFullYear()} La Gran Pantalla. Todos los derechos reservados.
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "0.875rem", mt: 1 }}>
        Creado con pasión para los amantes del cine.
      </Typography>

      {/* Íconos sociales con efecto hover */}
      <Box sx={{ mt: 2 }}>
        <IconButton
          color="inherit"
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{
            transition: "transform 0.3s, color 0.3s",
            "&:hover": {
              color: "#1877f2",
              transform: "scale(1.1)",
            },
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          sx={{
            transition: "transform 0.3s, color 0.3s",
            "&:hover": {
              color: "#1DA1F2",
              transform: "scale(1.1)",
            },
          }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          sx={{
            transition: "transform 0.3s, color 0.3s",
            "&:hover": {
              color: "#E1306C",
              transform: "scale(1.1)",
            },
          }}
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
