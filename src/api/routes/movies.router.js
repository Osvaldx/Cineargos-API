import { Router } from "express";
import middlewares from "../middlewares/middlewares.js";
import { getAllMovies, getMovieID, addMovie, updateMovie, deleteMovie } from "../controllers/moviesController.js";

const router = Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", middlewares.validateMovieID, getMovieID);
router.post("/movies/add", middlewares.validateToken, middlewares.isAdmin, middlewares.validateMovieParameters, addMovie);
router.put("/movies/update/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateMovieID, middlewares.validateMovieParameters, updateMovie);
router.delete("/movies/delete/:id", middlewares.validateToken, middlewares.isAdmin, middlewares.validateMovieID, deleteMovie);

export default router;