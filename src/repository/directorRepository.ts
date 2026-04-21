import { Director } from "../model/interface/director.js";
import prisma from "../database/prisma.js";

export default class DirectorRepository {
  async createDirector(name: string): Promise<Director> {
    const dataDirector = await prisma.director.create({
      data: { name: name },
    });
    console.log("Repository: Director create successfully");
    return new Director(dataDirector.id, dataDirector.name);
  }

  async findDirectorById(id: string): Promise<Director | null> {
    const dataDirector = await prisma.director.findUnique({
      where: { id: id },
    });
    if (dataDirector) {
      console.log("Repository: Director found successfully");
      return new Director(dataDirector.id, dataDirector.name);
    }
    console.log("Repository: Director not found");
    return null;
  }

  async findAllDirectors(): Promise<Director[]> {
    const dataDirectors = await prisma.director.findMany();
    console.log(`Repository: Directors fetched successfully. Total: ${dataDirectors.length}`)
    return dataDirectors.map(
      (director) => new Director(director.id, director.name),
    );
  }

  async updateDirector(director: Director): Promise<Director> {
    const dataDirector = await prisma.director.update({
      where: { id: director.getId() },
      data: { name: director.getName() },
    });
    console.log("Repository: Director update succesfully");
    return new Director(dataDirector.id, dataDirector.name);
  }

  async deleteDirector(id: string): Promise<void> {
    const dataDirector = await prisma.director.delete({
      where: { id: id },
    });
    console.log("Repository: Director delete sucessfully");
  }
}
