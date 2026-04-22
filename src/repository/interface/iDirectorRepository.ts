
import type { Director } from "../../model/interface/director.js";
import type { Movie } from "../../model/interface/movie.js";

export interface IDirectorRepository {
  createDirector(name: string): Promise<Director>;
  findDirectorByName(name: string): Promise<Director | null>;
  findDirectorById(id: string): Promise<Director | null>;
  findAllDirector(): Promise<Director[]>;
  updateDirector(director: Director): Promise<Director>;
  deleteDirector(id: string): Promise<void>;
  findMoviesByDirectorId(id: string): Promise<Movie[]>;
}
