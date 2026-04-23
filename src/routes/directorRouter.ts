import { Router } from "express";

import DirectorRepository from "../repository/directorRepository.js";
import DirectoryService from "../service/directorService.js";
import DirectorController from "../controller/directorController.js";

const router = Router();

const directorRepository = new DirectorRepository();
const directorService = new DirectoryService(directorRepository);
const directorController = new DirectorController(directorService);

router.post("/directors", (req, res) => {
  return directorController.createDirector(req, res);
});

export default router;