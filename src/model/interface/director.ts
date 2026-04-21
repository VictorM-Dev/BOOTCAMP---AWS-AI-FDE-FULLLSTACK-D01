export class Director {
  constructor(
    private readonly id: string,
    private name: string,
  ) {}

  getId(): string {
    return this.id;
  }

  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
