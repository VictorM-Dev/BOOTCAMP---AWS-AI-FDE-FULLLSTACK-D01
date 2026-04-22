import { expect, test, vi } from "vitest";
import DirectoryService from "../../src/service/directorService.js";
import { Director } from "../../src/model/interface/director.js";
import { Movie } from "../../src/model/interface/movie.js";

const mockRepository = {
  createDirector: vi.fn(),
  findDirectorByName: vi.fn(),
  findDirectorById: vi.fn(),
  findAllDirector: vi.fn(),
  updateDirector: vi.fn(),
  deleteDirector: vi.fn(),
  findMoviesByDirectorId: vi.fn(),
};

const service = new DirectoryService(mockRepository);

test("create director sucessfully", async () => {
  mockRepository.createDirector.mockResolvedValue({
    id: "1",
    name: "João",
  });
  mockRepository.findDirectorByName.mockResolvedValue(null);
  const result = await service.createDirector("João");
  expect(result).toEqual({
    id: "1",
    name: "João",
  });
});

test("not create director if name already exists", async () => {
  mockRepository.findDirectorByName.mockResolvedValue({
    id: "1",
    name: "João",
  });
  await expect(service.createDirector("João")).rejects.toThrow(
    "Director already exists",
  );
});

test("find director sucessfully", async () => {
  mockRepository.findDirectorById.mockResolvedValue({
    id: "1",
    name: "João",
  });
  const result = await service.findDirectorById("1");
  expect(result).toEqual({
    id: "1",
    name: "João",
  });
});

test("director not found", async () => {
  mockRepository.findDirectorById.mockResolvedValue(null);
  await expect(service.findDirectorById("2")).rejects.toThrow(
    "Director not found",
  );
});

test("empty all director", async () => {
  mockRepository.findAllDirector.mockResolvedValue([]);
  const result = await service.findAllDirector();
  expect(result).toEqual([]);
});

test("all director sucessfully", async () => {
  mockRepository.findAllDirector.mockResolvedValue([
    { id: "1", name: "João" },
    { id: "2", name: "Victor" },
  ]);
  const result = await service.findAllDirector();
  expect(result).toEqual([
    { id: "1", name: "João" },
    { id: "2", name: "Victor" },
  ]);
});

test("update: director not found", async () => {
  mockRepository.findDirectorById.mockResolvedValue(null);
  const dataDirector = new Director("1", "João");
  await expect(service.updateDirector(dataDirector)).rejects.toThrow(
    "Director not found",
  );
});

test("update: director name to equal as the previous one", async () => {
  const dataDirector = new Director("1", "João");
  mockRepository.findDirectorById.mockResolvedValue(dataDirector);
  await expect(service.updateDirector(dataDirector)).rejects.toThrow(
    "The name cannot be the same as the previous one",
  );
});

test("update: director name already exists", async () => {
  const dataDirector1 = new Director("1", "João");
  const dataDirector2 = new Director("2", "Victor");
  mockRepository.findDirectorById.mockResolvedValue(dataDirector1);
  mockRepository.findDirectorByName.mockResolvedValue(dataDirector2);
  const dataDirectorUpdate = new Director("1", "Victor");
  await expect(service.updateDirector(dataDirectorUpdate)).rejects.toThrow(
    "Director already exists",
  );
});

test("update: director sucessfully", async () => {
  const dataDirector1 = new Director("1", "João");
  mockRepository.findDirectorById.mockResolvedValue(dataDirector1);
  mockRepository.findDirectorByName.mockResolvedValue(null);
  const dataDirectorUpdate = new Director("1", "João Victor");
  mockRepository.updateDirector.mockResolvedValue(dataDirectorUpdate);
  const result = await service.updateDirector(dataDirectorUpdate);
  expect(result).toEqual(dataDirectorUpdate);
});

test("delete: director not found", async () => {
  mockRepository.findDirectorById.mockResolvedValue(null);
  await expect(service.deleteDirector("1")).rejects.toThrow(
    "Director not found",
  );
});

test("delete director with movies", async () => {
  mockRepository.findDirectorById.mockResolvedValue({
    id: "1",
    name: "João",
  });
  //The return in service is void
  mockRepository.deleteDirector.mockResolvedValue(undefined);
  mockRepository.findMoviesByDirectorId.mockResolvedValue([1]);
  await expect(service.deleteDirector("1")).rejects.toThrow(
    "Do not remove director with movies",
  );
});

test("delete sucessfully", async () => {
  mockRepository.findDirectorById.mockResolvedValue({
    id: "1",
    name: "João",
  });
  //The return in service is void
  mockRepository.deleteDirector.mockResolvedValue(undefined);
  mockRepository.findMoviesByDirectorId.mockResolvedValue([]);
  await service.deleteDirector("1");
  expect(mockRepository.deleteDirector).toHaveBeenCalledWith("1");
});

test("find movies director is empty", async () => {
  mockRepository.findMoviesByDirectorId.mockResolvedValue([]);
  const result = await service.findMoviesByDirectorId("1");
  expect(result).toEqual([]);
});

test("find movies director", async () => {
  mockRepository.findDirectorById.mockResolvedValue({ id: "1", name: "João" });
  const dataMovie = new Movie("1", "file", "descrição", 1999, "ação", "1");
  mockRepository.findMoviesByDirectorId.mockResolvedValue([dataMovie]);
  const result = await service.findMoviesByDirectorId("1");
  expect(result).toEqual([dataMovie]);
});

test("find movies director not found", async () => {
  mockRepository.findDirectorById.mockResolvedValue(null);
  await expect(service.findMoviesByDirectorId("1")).rejects.toThrow(
    "Director not found",
  );
});
