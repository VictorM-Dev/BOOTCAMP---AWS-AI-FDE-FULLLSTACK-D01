import { Director } from "../model/interface/director.js";
import { AppError } from "../middlewares/appError.js";
import type { IDirectorRepository } from "../repository/interface/iDirectorRepository.js";

export default class DirectoryService {
  constructor(private directoryRepository: IDirectorRepository) {}
  async createDirector(name: string): Promise<Director> {
    const exists = await this.directoryRepository.findDirectorByName(name);
    if (exists) {
      console.log("Director already exists");
      throw new AppError("Director already exists", 409);
    }
    return await this.directoryRepository.createDirector(name);
  }

  async findDirectorById(id: string): Promise<Director | null>{
    const dataDirector = await this.directoryRepository.findDirectorById(id);
    if(!dataDirector){
      console.log("Director not found");
      throw new AppError("Director not found", 404);
    }
    return dataDirector;
  }

  async findAllDirector(): Promise<Director[]>{
    return this.directoryRepository.findAllDirector();
  }

  async updateDirector(director: Director): Promise<Director>{
    const dataDirector = await this.directoryRepository.findDirectorById(director.getId());
    if(!dataDirector){
      console.log("Director not found");
      throw new AppError("Director not found", 404);
    }
    if(dataDirector.getName() === director.getName()){
      console.log("The name cannot be the same as the previous one");
      throw new AppError("The name cannot be the same as the previous one", 400);
    }
    const dataDirectorName = await this.directoryRepository.findDirectorByName(director.getName());
    if(dataDirectorName) {
      console.log("Director already exists");
      throw new AppError("Director already exists", 409);
    }
    return this.directoryRepository.updateDirector(director);
  }
}
