import { Router } from "express";

import MovieRepository from "../repository/movieRepository.js";
import DirectorRepository from "../repository/directorRepository.js";
import MovieService from "../service/movieService.js";
import MovieController from "../controller/movieController.js";
import validationCreateMovie from "../middlewares/validation/validationCreateMovie.js";

const router = Router();

const movieRepository = new MovieRepository();
const directorRepository = new DirectorRepository();
const movieService = new MovieService(movieRepository, directorRepository);
const movieController = new MovieController(movieService);

router.post("/movies", validationCreateMovie, (req, res) => {
  console.log(req.body);
  return movieController.createMovie(req, res);
})

router.get("/movies", (req, res) => {
  console.log(req.query);
  return movieController.findAllMovies(req, res);
});

router.get("/movies/:id", (req, res) => {
  console.log(req.params);
  return movieController.findMovieById(req, res);
})
export default router;
