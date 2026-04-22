export class CreateMovieDTO {
  constructor(
    public title: string,
    public description: string,
    public releaseYear: number,
    public genre: string,
    public readonly directorId: string,
  ) {}
}
