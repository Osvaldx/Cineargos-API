import { Router } from "express";
import middlewares from "../middlewares/middlewares.js";
import { getAllMovies } from "../controllers/moviesController.js";

const router = Router();

router.get("/movies", getAllMovies);
// router.get("/movies/:id", middlewares.validateMovieID,);
// router.post("/movies/add", middlewares.validateMovieParameters,);
// router.put("/movies/update/:id",middlewares.validateMovieID,middlewares.validateMovieParameters,);
// router.delete("/movies/delete/:id", middlewares.validateMovieID,);

export default router;