import { AppError } from "../middlewares/appError.js";
import { Movie } from "../model/interface/movie.js";
import type { CreateMovieDTO } from "../model/DTO/createMovieDTO.js";
import type { IDirectorRepository } from "../repository/interface/iDirectorRepository.js";
import type { IMovieRepository } from "../repository/interface/iMovieRepository.js";

export default class MovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private directorRepository: IDirectorRepository,
  ) {}

  async createMovie(movie: CreateMovieDTO): Promise<Movie> {
    console.log(movie);
    const dataDirector = await this.directorRepository.findDirectorById(
      movie.directorId,
    );
    if (!dataDirector) {
      throw new AppError("Director not found", 404);
    }
    const dataMovies = await this.movieRepository.findAllMovies({
      title: movie.title,
    });
    if (dataMovies.length > 0) {
      const exists = dataMovies.some(
        (m) =>
          m.getDirectorId() === movie.directorId &&
          m.getReleaseYear() === movie.releaseYear,
      );

      if (exists) {
        throw new AppError("Movie already exists", 409);
      }
    }
    return await this.movieRepository.createMovie(movie);
  }

  async findAllMovies(filters: {
    title?: string;
    genre?: string;
    releaseYear?: number;
  }): Promise<Movie[]> {
    return this.movieRepository.findAllMovies(filters);
  }

  async updateMovie(movie: Movie): Promise<Movie> {
    const dataDirector = await this.directorRepository.findDirectorById(
      movie.getDirectorId(),
    );
    if (!dataDirector) {
      throw new AppError("Director not found", 404);
    }
    const dataMovies = await this.movieRepository.findAllMovies({
      title: movie.getTitle(),
    });
    if (dataMovies.length > 0) {
      dataMovies.some((m) => {
        if (
          m.getDirectorId() === movie.getDirectorId() &&
          m.getReleaseYear() === movie.getReleaseYear()
        ) {
          throw new AppError("Movie already exists", 409);
        }
      });
    }
    return this.movieRepository.updateMovie(movie);
  }

  async deleteMovie(id: string): Promise<void> {
    const dataMovie = await this.movieRepository.findMovieById(id);
    if (!dataMovie) {
      throw new AppError("Movie not found", 404);
    }
    return this.movieRepository.deleteMovie(id);
  }
}
