import { Movie } from "../model/interface/movie.js";
import type { Movie as PrismaMovie } from "../generated/prisma/client.js";
import prisma from "../database/prisma.js";
import type { IMovieRepository } from "./interface/iMovieRepository.js";
import type { CreateMovieDTO } from "./DTO/createMovieDTO.js";
import { title } from "node:process";

export default class MovieRepository implements IMovieRepository {
  // Helper function to transform Prisma model into domain entity
  prismaToClass(movie: PrismaMovie): Movie {
    return new Movie(
      movie.id,
      movie.title,
      movie.description,
      movie.releaseYear,
      movie.genre,
      movie.directorId,
    );
  }

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
    return this.prismaToClass(dataMovie);
  }

  async findAllMovies(filters: {
    title: string | undefined;
    genre: string | undefined;
    releaseYear: number | undefined;
  }): Promise<Movie[]> {
    const dataMovies = await prisma.$queryRaw<PrismaMovie[]>`
      SELECT * FROM Movie
      WHERE(
        ${filters.title} IS NULL OR title = ${filters.title}
        AND ${filters.genre} IS NULL OR genre = ${filters.genre}
        AND ${filters.releaseYear} IS NULL OR releaseYear = ${filters.releaseYear}
      )`;
    return dataMovies.map((movie) => this.prismaToClass(movie));
  }
}
