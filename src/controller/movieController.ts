import type { Request, Response } from "express";
import type MovieService from "../service/movieService.js";
import { CreateMovieDTO } from "../model/DTO/createMovieDTO.js";
import { Movie } from "../model/interface/movie.js";

export default class MovieController {
  constructor(private movieService: MovieService) {}
  async createMovie(req: Request, res: Response): Promise<Response> {
    const { title, description, releaseYear, genre, directorId } = req.body;
    const movie = new CreateMovieDTO(
      title,
      description,
      releaseYear,
      genre,
      directorId,
    );
    const dataMovie = await this.movieService.createMovie(movie);
    return res.status(201).json(dataMovie);
  }

  async findAllMovies(req: Request, res: Response): Promise<Response> {
    const { title, releaseYear, genre } = req.query as {
      title: string;
      releaseYear: string;
      genre: string;
    };
    const dataMovies = await this.movieService.findAllMovies({
      title,
      releaseYear,
      genre,
    });
    return res.status(200).json(dataMovies);
  }

  async findMovieById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const dataMovie = await this.movieService.findMovieById(id);
    return res.status(200).json(dataMovie);
  }

  async updateMovie(req: Request, res: Response): Promise<Response> {
    const { title, description, releaseYear, genre, directorId } = req.body;
    const { id } = req.params as {id:string}; 
    const movie = new Movie(
      id,
      title,
      description,
      releaseYear,
      genre,
      directorId,
    );
    const dataMovie = await this.movieService.updateMovie(movie);
    return res.status(200).json(dataMovie);
  }
}
