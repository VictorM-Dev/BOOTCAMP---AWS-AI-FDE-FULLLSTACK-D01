import type { Request, Response } from "express";
import type DirectorService from "../service/directorService.js";
import { AppError } from "../middlewares/appError.js";

export default class directorController {
  constructor(private directorService: DirectorService) {}
  async createDirector(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const dataDirector = await this.directorService.createDirector(name);
      return res.status(201).json(dataDirector);
    } catch (e: unknown) {
      if (e instanceof AppError) {
        return res.status(e.statusCode).json({
          message: e.message,
        });
      }
      return res.status(500).json({})
    }
  }
}
