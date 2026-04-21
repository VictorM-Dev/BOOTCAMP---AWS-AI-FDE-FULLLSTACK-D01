import { Director } from "../model/interface/director.js";
import { AppError } from "../middlewares/appError.js";
import DirectorRepository from "../repository/directorRepository.js";

export default class DirectoryService {
  constructor(private directoryRepository: DirectorRepository) {}
  async createDirector(name: string): Promise<Director> {
    const exists = await this.directoryRepository.findDirectorByName(name);
    if (exists) {
      throw new AppError("Director already exists", 409);
    }
    return await this.directoryRepository.createDirector(name);
  }
}
