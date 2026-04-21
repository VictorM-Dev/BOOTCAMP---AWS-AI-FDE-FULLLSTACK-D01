import { Director } from "../model/interface/director.js";
import prisma from "../database/prisma.js";

export default class DirectorRepository{
  async createDirector(name: string):Promise<Director>{
    const dataDirector = await prisma.director.create({
      data: { name: name }
    })
    return new Director(dataDirector.id, dataDirector.name);
  }
}