import type { Request, Response } from "express";
import type DirectorService from "../service/directorService.js";

export default class directorController {
  constructor(private directorService: DirectorService) {}
  async createDirector(req: Request, res: Response) {
    const { name } = req.body;
    const dataDirector = await this.directorService.createDirector(name);
    return res.status(201).json(dataDirector);
  }
}
