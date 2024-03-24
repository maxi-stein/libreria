export class CreateBookDto {
  readonly authors: string[];
  readonly editorial: string;
  readonly title: string;
  readonly category: string;
  readonly price: number;
  readonly releaseDate: Date;
  readonly description: string;
}
