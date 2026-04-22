import { Movie } from "../model/interface/movie.js";
import prisma from "../database/prisma.js";
import type { IMovieRepository } from "./interface/iMovieRepository.js";
import type { CreateMovieDTO } from "./DTO/createMovieDTO.js";

export default class MovieRepository implements IMovieRepository {
  async createMovie(movie: CreateMovieDTO): Promise<Movie> {
    const dataMovie = await prisma.movie.create({
      data: {
        title: movie.title,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genre: movie.genre,
        directorId: movie.directorId,
      },
    });
    return new Movie(
      dataMovie.id,
      dataMovie.title,
      dataMovie.description,
      dataMovie.releaseYear,
      dataMovie.genre,
      dataMovie.directorId,
    );
  }
}
