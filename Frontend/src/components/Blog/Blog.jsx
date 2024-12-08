import { Box, Typography, Grid2, Card, CardContent, CardActions, Button, CardMedia } from "@mui/material";

export const Blog = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Blog
      </Typography>

      {/* Grid para las publicaciones de blog */}
      <Grid2 container spacing={3}>
        {[1, 2, 3].map((post) => (
          <Grid2 item xs={12} sm={6} md={4} key={post}>
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
              {/* Imagen de portada para la publicación */}
              <CardMedia
                component="img"
                height="140"
                image={`https://via.placeholder.com/300x140?text=Blog+Post+${post}`}
                alt={`Blog Post ${post}`}
              />

              <CardContent>
                <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: "bold" }}>
                  Título del Blog {post}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Resumen breve de la publicación {post}.
                </Typography>
              </CardContent>

              <CardActions sx={{ p: 2, justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#0072ff",
                      color: "#fff",
                    },
                  }}
                >
                  Leer más
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};
