export class CreateBookDto {
  readonly authors: string[];
  readonly publisher: string;
  readonly title: string;
  readonly category: string;
  readonly price: number;
  releaseDate: string;
  readonly description: string;
  readonly pagination?: string;
  readonly page?: number;
  readonly pageSize?: number;
  readonly categoryFilter?: string;
}
