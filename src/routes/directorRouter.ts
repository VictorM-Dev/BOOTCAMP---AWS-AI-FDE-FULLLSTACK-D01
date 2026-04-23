import { Router } from "express";

import DirectorRepository from "../repository/directorRepository.js";
import DirectoryService from "../service/directorService.js";
import DirectorController from "../controller/directorController.js";

import validationCreateDirector from "../middlewares/validation/validationCreateDirector.js";

const router = Router();

const directorRepository = new DirectorRepository();
const directorService = new DirectoryService(directorRepository);
const directorController = new DirectorController(directorService);

router.get("/directors/:id", (req, res) => {
  console.log(req.params);
  return directorController.findDirectorById(req, res);
});

router.get("/directors", (req, res) => {
  return directorController.findAllDirectors(req, res);
});

router.get("/directors/:id/movies", (req, res) => {
  console.log(req.params);
  return directorController.findMoviesByDirectorId(req, res);
});

router.post("/directors", validationCreateDirector, (req, res) => {
  console.log(req.body);
  return directorController.createDirector(req, res);
});

router.delete("/directors/:id", (req, res)=>{
  console.log(req.params);
  return directorController.deleteDirector(req, res);
})

router.put("/directors/:id", validationCreateDirector, (req, res) => {
  console.log(req.params);
  return directorController.updateDirector(req, res);
});

export default router;
