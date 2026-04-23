import { Movie } from "../model/interface/movie.js";
import type { Movie as PrismaMovie } from "../generated/prisma/client.js";
import prisma from "../database/prisma.js";
import type { IMovieRepository } from "./interface/iMovieRepository.js";
import type { CreateMovieDTO } from "../model/DTO/createMovieDTO.js";

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
    title?: string;
    genre?: string;
    releaseYear?: number;
  }): Promise<Movie[]> {
    const dataMovies = await prisma.movie.findMany({
      where: {
        ...(filters.title && { title: filters.title }),
        ...(filters.genre && { genre: filters.genre }),
        ...(filters.releaseYear !== undefined && {
          releaseYear: filters.releaseYear,
        }),
      },
    });

    return dataMovies.map((movie) => this.prismaToClass(movie));
  }

  async findMovieById(id: string): Promise<Movie | null> {
    const dataMovie = await prisma.movie.findUnique({
      where: { id: id },
    });
    if (dataMovie) {
      return this.prismaToClass(dataMovie);
    }
    return null;
  }

  async updateMovie(movie: Movie): Promise<Movie> {
    const dataMovie = await prisma.movie.update({
      where: { id: movie.getId() },
      data: {
        title: movie.getTitle(),
        description: movie.getDescription(),
        releaseYear: movie.getReleaseYear(),
        genre: movie.getGenre(),
        directorId: movie.getDirectorId(),
      },
    });
    return this.prismaToClass(dataMovie);
  }

  async deleteMovie(id: string): Promise<void> {
    const dataMovie = await prisma.movie.delete({
      where: { id: id },
    });
  }
}
