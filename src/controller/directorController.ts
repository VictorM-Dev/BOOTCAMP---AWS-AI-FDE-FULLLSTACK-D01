import type { Request, Response } from "express";
import type DirectorService from "../service/directorService.js";
import { Director } from "../model/interface/director.js";

export default class directorController {
  constructor(private directorService: DirectorService) {}
  async createDirector(req: Request, res: Response):Promise<Response>{
    const { name } = req.body;
    const dataDirector = await this.directorService.createDirector(name);
    return res.status(201).json(dataDirector);
  }

  async findDirectorById(req: Request, res: Response):Promise<Response>{
    const { id } = req.params as { id: string };
    const dataDirector = await this.directorService.findDirectorById(id);
    return res.status(200).json(dataDirector);
  }

  async findAllDirectors(req: Request, res: Response):Promise<Response>{
    const dataDirectors = await this.directorService.findAllDirector();
    return res.status(200).json(dataDirectors);
  }

  async findMoviesByDirectorId(req: Request, res: Response):Promise<Response>{
    const { id } = req.params as { id: string };
    const dataMovies = await this.directorService.findMoviesByDirectorId(id);
    return res.status(200).json(dataMovies);
  }

  async updateDirector(req: Request, res: Response):Promise<Response>{
    const { name } = req.body;
    const { id } = req.params as { id: string };
    const director = new Director(id, name);
    const dataDirector = await this.directorService.updateDirector(director);
    return res.status(200).json(dataDirector);
  }

  async deleteDirector(req: Request, res: Response):Promise<Response>{
    const { id } = req.params as { id: string };
    await this.directorService.deleteDirector(id);
    return res.status(204).send();
  }
}
