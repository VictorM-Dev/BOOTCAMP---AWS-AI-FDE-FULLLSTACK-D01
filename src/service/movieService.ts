import { AppError } from "../middlewares/appError.js";
import { Movie } from "../model/interface/movie.js";
import type { CreateMovieDTO } from "../repository/DTO/createMovieDTO.js";
import type { IDirectorRepository } from "../repository/interface/iDirectorRepository.js";
import type { IMovieRepository } from "../repository/interface/iMovieRepository.js";

export default class MovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private directorRepository: IDirectorRepository,
  ) {}

  async createMovie(movie: CreateMovieDTO): Promise<Movie> {
    const directorData = await this.directorRepository.findDirectorById(movie.directorId);
    if(!directorData){
      throw new AppError("Director not found", 404);
    }
    const dataMovies = await this.movieRepository.findAllMovies({title: movie.title});
    if(dataMovies.length > 0){
      dataMovies.some((m)=>{
        if(m.getDirectorId() === movie.directorId && m.getReleaseYear() === movie.releaseYear){
          throw new AppError("Movie already exists", 409);
        }
      })
    }
    return await this.movieRepository.createMovie(movie);
  }


}
