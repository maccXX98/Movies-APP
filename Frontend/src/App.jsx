import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Aside } from "./components/Aside/Aside";
import { Carousel } from "./components/Carousel/Carousel";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Nav } from "./components/Nav/Nav";
import { Skeleton } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch } from "wouter";
import { Movies } from "./components/Movies/Movies";
import { Blog } from "./components/Blog/Blog";
import { Contact } from "./components/Contact/Contact";
import { useFetchMovies } from "./hooks/useFetchMovies";

function App() {
  const { loading, error } = useFetchMovies();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="layout">
        <Header />
        <Nav />

        <div className="main-content">
          <Switch>
            <Route path="/">
              <div className="carousel-container">
                {loading ? (
                  <Skeleton variant="rectangular" height={300} sx={{ mb: 2 }} />
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <Carousel />
                )}
              </div>
              <div className="aside-container">
                <Aside />
              </div>
            </Route>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/blog">
              <Blog />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;
