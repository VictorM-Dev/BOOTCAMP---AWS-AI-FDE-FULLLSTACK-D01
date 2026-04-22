import { expect, test, vi } from "vitest";
import MovieService from "../../src/service/movieService";
import { CreateMovieDTO } from "../../src/repository/DTO/createMovieDTO";
import { Movie } from "../../src/model/interface/movie";
import { Director } from "../../src/model/interface/director";

const mockMovieRepository = {
  createMovie: vi.fn(),
  findAllMovies: vi.fn(),
};

const mockDirectorRepository = {
  createDirector: vi.fn(),
  findDirectorByName: vi.fn(),
  findDirectorById: vi.fn(),
  findAllDirector: vi.fn(),
  updateDirector: vi.fn(),
  deleteDirector: vi.fn(),
  findMoviesByDirectorId: vi.fn(),
};

const service = new MovieService(mockMovieRepository, mockDirectorRepository);

const dataMovie = new CreateMovieDTO("Filme", "Descrição", 1999, "Gênero", "1");
const dataMovieMock = new Movie("1", "Filme", "Descrição", 1999, "Gênero", "1");
const dataDirector = new Director("1", "João");

test("create movie sucessfully", async () => {
  mockDirectorRepository.findDirectorById.mockResolvedValue(dataDirector);
  mockMovieRepository.findAllMovies.mockResolvedValue([]);
  mockMovieRepository.createMovie.mockResolvedValue(dataMovieMock);
  const result = await service.createMovie(dataMovie);
  expect(result).toEqual(dataMovieMock);
});

test("create movie director not found", async () => {
  mockDirectorRepository.findDirectorById.mockResolvedValue(null);
  await expect(service.createMovie(dataMovie)).rejects.toThrow(
    "Director not found",
  );
});

test("create movie with name exists reject", async () => {
  mockDirectorRepository.findDirectorById.mockResolvedValue(dataDirector);
  mockMovieRepository.findAllMovies.mockResolvedValue([dataMovieMock]);
  mockMovieRepository.createMovie.mockResolvedValue(dataMovieMock);
  await expect(service.createMovie(dataMovie)).rejects.toThrow(
    "Movie already exists",
  );
});

test("create movie with name exists pass (releaseYear)", async ()=>{
  mockDirectorRepository.findDirectorById.mockResolvedValue(dataDirector);
  mockMovieRepository.findAllMovies.mockResolvedValue([dataMovieMock]);
  const newMovieResult = new Movie("1","Filme", "Descirção", 2000, "Gênero", "1")
  mockMovieRepository.createMovie.mockResolvedValue(newMovieResult);
  const newMovie = new CreateMovieDTO("Filme", "Descirção", 2000, "Gênero", "1");
  const result = await service.createMovie(newMovie);
  expect(result).toEqual(newMovieResult);
})

test("create movie with name exists pass (directorId)", async ()=>{
  mockDirectorRepository.findDirectorById.mockResolvedValue(dataDirector);
  mockMovieRepository.findAllMovies.mockResolvedValue([dataMovieMock]);
  const newMovieResult = new Movie("1","Filme", "Descirção", 1999, "Gênero", "2")
  mockMovieRepository.createMovie.mockResolvedValue(newMovieResult);
  const newMovie = new CreateMovieDTO("Filme", "Descirção", 1999, "Gênero", "2");
  const result = await service.createMovie(newMovie);
  expect(result).toEqual(newMovieResult);
})

