import type { Request, Response } from "express";
import type MovieService from "../service/movieService.js";
import { CreateMovieDTO } from "../model/DTO/createMovieDTO.js";

export default class MovieController{
  constructor(private movieService: MovieService){};
  async createMovie(req: Request, res: Response){
    const { title, description, releaseYear, genre, directorId } = req.body;
    const movie = new CreateMovieDTO(title, description, releaseYear, genre, directorId);
    const dataMovie = await this.movieService.createMovie(movie);
    return res.status(201).json(dataMovie);
  };
}