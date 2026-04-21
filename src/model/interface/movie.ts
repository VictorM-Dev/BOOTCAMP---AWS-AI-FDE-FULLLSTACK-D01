import type { UUID } from "node:crypto";

export class Movie {
  constructor(
    private readonly id: string,
    private title: string,
    private description: string,
    private releaseYear: number,
    private genre: string,
    private readonly directorId: string,
  ) {}

  getId(): string {
    return this.id;
  }

  setTitle(title: string): void {
    this.title = title;
  }
  getTitle(): string {
    return this.title;
  }

  setDescription(description: string): void {
    this.description = description;
  }
  getDescription(): string {
    return this.description;
  }

  setReleaseYear(releaseYear: number): void {
    this.releaseYear = releaseYear;
  }
  getReleaseYear(): number {
    return this.releaseYear;
  }

  setGenre(genre: string): void {
    this.genre = genre;
  }
  getGenre(): string {
    return this.genre;
  }

  getDirectorId(): string {
    return this.directorId;
  }
}
