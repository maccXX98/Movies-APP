import { Box, Typography, Grid2, Card, CardContent, CardMedia, Button, Menu, MenuItem } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";

export const Movies = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Películas
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleFilterClick}
          endIcon={<FilterListIcon />}
          sx={{
            textTransform: "none",
            mr: 1,
            "&:hover": {
              backgroundColor: "#0072ff",
              color: "#fff",
            },
          }}
        >
          Filtrar Películas
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleFilterClose}>
          <MenuItem onClick={handleFilterClose}>Acción</MenuItem>
          <MenuItem onClick={handleFilterClose}>Comedia</MenuItem>
          <MenuItem onClick={handleFilterClose}>Drama</MenuItem>
        </Menu>
      </Box>

      <Grid2 container spacing={3}>
        {[1, 2, 3, 4, 5].map((movie) => (
          <Grid2 item xs={12} sm={6} md={4} key={movie}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={`https://via.placeholder.com/300x200?text=Movie+${movie}`}
                alt={`Movie ${movie}`}
              />
              <CardContent>
                <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: "bold" }}>
                  Película {movie}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Descripción breve de la película {movie}.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#0072ff",
                    "&:hover": {
                      backgroundColor: "#005bb5",
                    },
                  }}
                >
                  Ver más
                </Button>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
