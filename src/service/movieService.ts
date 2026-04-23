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

  async findAllMovies(params: {
    title?: string;
    genre?: string;
    releaseYear?: string;
  }): Promise<Movie[]> {
    const filters: { title?: string; releaseYear?: number; genre?: string } =
      {};

    if (params.title) {
      filters.title = params.title;
    }
    if (params.releaseYear) {
      const parsedReleaseYear = Number(params.releaseYear);
      if (Number.isNaN(parsedReleaseYear)) {
        throw new AppError("Invalid release year", 400);
      }
      filters.releaseYear = Number(params.releaseYear);
    }
    if (params.genre) {
      filters.genre = params.genre;
    }
    return this.movieRepository.findAllMovies(filters);
  }

  async updateMovie(movie: Movie): Promise<Movie> {
    const dataDirector = await this.directorRepository.findDirectorById(
      movie.getDirectorId(),
    );
    if (!dataDirector) {
      throw new AppError("Director not found", 404);
    }
    const dataMovie = await this.movieRepository.findMovieById(movie.getId());
    if(!dataMovie){
      throw new AppError("Movie not found", 404);
    }
    if (
      dataMovie.getTitle() === movie.getTitle() &&
      dataMovie.getDescription() === movie.getDescription() &&
      dataMovie.getReleaseYear() === movie.getReleaseYear() &&
      dataMovie.getGenre() === movie.getGenre() &&
      dataMovie.getDirectorId() === movie.getDirectorId()
    ) {
      throw new AppError("Movie equal to previous one", 409);
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

  async findMovieById(id: string): Promise<Movie> {
    const dataMovie = await this.movieRepository.findMovieById(id);
    if (!dataMovie) {
      throw new AppError("Movie not found", 404);
    }
    return dataMovie;
  }
}
