import type { Director } from "../../model/interface/director.js";

export interface IDirectorRepository{
  createDirector(name: string): Promise<Director>
  findDirectorByName(name: string): Promise<Director | null>
  findDirectorById(id: string): Promise<Director | null>
}