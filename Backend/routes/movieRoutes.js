import { Router } from "express";
import { upload } from "../utils/upload.js";
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from "../controllers/movieController.js";

const router = Router();

router.post("/movies", upload.fields([{ name: "image", maxCount: 1 }]), createMovie);
router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.patch("/movies/:id", upload.fields([{ name: "image", maxCount: 1 }]), updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
