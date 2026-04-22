import { Director } from "../model/interface/director.js";
import prisma from "../database/prisma.js";

export default class DirectorRepository {
  async createDirector(name: string): Promise<Director> {
    const dataDirector = await prisma.director.create({
      data: { name: name },
    });
    return new Director(dataDirector.id, dataDirector.name);
  }

  async findDirectorById(id: string): Promise<Director | null> {
    const dataDirector = await prisma.director.findUnique({
      where: { id: id },
    });
    if (dataDirector) {
      return new Director(dataDirector.id, dataDirector.name);
    }
    return null;
  }

  async findAllDirectors(): Promise<Director[]> {
    const dataDirectors = await prisma.director.findMany();
    return dataDirectors.map(
      (director) => new Director(director.id, director.name),
    );
  }

  async updateDirector(director: Director): Promise<Director> {
    const dataDirector = await prisma.director.update({
      where: { id: director.getId() },
      data: { name: director.getName() },
    });
    return new Director(dataDirector.id, dataDirector.name);
  }

  async deleteDirector(id: string): Promise<void> {
    const dataDirector = await prisma.director.delete({
      where: { id: id },
    });
  }

  //Using for validation in service
  async findDirectorByName(name: string): Promise<Director | null> {
    const dataDirector = await prisma.director.findUnique({
      where: { name: name },
    });
    if (dataDirector) {
      return new Director(dataDirector.id, dataDirector.name);
    }
    return null;
  }
}
