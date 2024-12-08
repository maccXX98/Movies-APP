import { AppBar, Toolbar, Typography, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ background: "linear-gradient(90deg, #0072ff, #00c6ff)", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)" }}
    >
      <Toolbar>
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, color: "#fff", fontWeight: 700, letterSpacing: 1.5 }}
        >
          La Gran Pantalla
        </Typography>

        {/* Barra de búsqueda con icono de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Buscar películas..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#0072ff" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            minWidth: "250px",
            "& .MuiOutlinedInput-input": {
              padding: "8px",
              cursor: "pointer",
            },
            "&:hover": {
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              borderColor: "#0072ff",
            },
          }}
        />
      </Toolbar>
    </AppBar>
  );
};
