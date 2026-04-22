import type { Movie } from "../../model/interface/movie.js";
import type { CreateMovieDTO } from "../DTO/createMovieDTO.js";

export interface IMovieRepository {
  createMovie(movie: CreateMovieDTO): Promise<Movie>;
  findAllMovies(filters: {
    title?: string;
    genre?: string;
    releaseYear?: number;
  }): Promise<Movie[]>;
}
