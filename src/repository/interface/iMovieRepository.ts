import type { CreateMovieDTO } from "../../model/DTO/createMovieDTO.js";
import type { Movie } from "../../model/interface/movie.js";

export interface IMovieRepository {
  createMovie(movie: CreateMovieDTO): Promise<Movie>;
  findAllMovies(filters: {
    title?: string;
    genre?: string;
    releaseYear?: number;
  }): Promise<Movie[]>;
  updateMovie(movie: Movie): Promise<Movie>;
}
