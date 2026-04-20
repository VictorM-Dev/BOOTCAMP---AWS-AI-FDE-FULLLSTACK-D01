import type { UUID } from "node:crypto";

export class Director {
  constructor(
    private readonly id: UUID,
    private name: string,
  ) {}

  getId(): UUID {
    return this.id;
  }

  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
}
