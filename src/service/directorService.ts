import { Director } from "../model/interface/director.js";
import { AppError } from "../middlewares/appError.js";
import type { IDirectorRepository } from "../repository/interface/iDirectorRepository.js";

export default class DirectoryService {
  constructor(private directoryRepository: IDirectorRepository) {}
  async createDirector(name: string): Promise<Director> {
    const exists = await this.directoryRepository.findDirectorByName(name);
    if (exists) {
      throw new AppError("Director already exists", 409);
    }
    return await this.directoryRepository.createDirector(name);
  }
}
