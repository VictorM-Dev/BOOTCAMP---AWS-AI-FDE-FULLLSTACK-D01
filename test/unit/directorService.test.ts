import { expect, test, vi } from "vitest";
import DirectoryService from "../../src/service/directorService.js";

const mockRepository = {
  createDirector: vi.fn(),
  findDirectorByName: vi.fn(),
  findDirectorById: vi.fn(),
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

test("not found director", async () => {
  mockRepository.findDirectorById.mockResolvedValue(null);
  await expect(service.findDirectorById("2")).rejects.toThrow(
    "Director not found",
  );
});
