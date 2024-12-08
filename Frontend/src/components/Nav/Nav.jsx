import { AppBar, Toolbar, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import ArticleIcon from "@mui/icons-material/Article";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { Link } from "wouter";

export const Nav = () => {
  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #00c6ff, #0072ff)",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <Button
            component={Link}
            href="/"
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Inicio
          </Button>
          <Button
            component={Link}
            href="/movies"
            color="inherit"
            startIcon={<MovieIcon />}
            sx={{
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Películas
          </Button>
          <Button
            component={Link}
            href="/blog"
            color="inherit"
            startIcon={<ArticleIcon />}
            sx={{
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Blog
          </Button>
          <Button
            component={Link}
            href="/contact"
            color="inherit"
            startIcon={<ContactMailIcon />}
            sx={{
              mx: 1,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Contacto
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
