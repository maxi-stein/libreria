import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CreateBookDto {
  @ApiProperty({ description: 'Array of authors ID for the book' })
  @IsNotEmpty()
  readonly authors: string[];

  @ApiProperty({ description: "Publisher's id" })
  @IsNotEmpty()
  readonly publisher: string;

  @ApiProperty({ description: "Book's title" })
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ description: "Book's literary genre" })
  @IsNotEmpty()
  readonly category: string;

  @ApiProperty({ description: "Book's price" })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    description:
      "Book's release date. The acceptable date format is dd/mm/yyyy or dd/mm/yy",
  })
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({ description: "Book's description" })
  @IsNotEmpty()
  readonly description: string;
}

export class GetBookDto {
  @ApiProperty({
    description: "Book's pagination toggle. Possible values:true or false",
    enum: ['true', 'false'],
  })
  @IsOptional()
  readonly pagination?: string;

  @ApiProperty({
    description: 'Number of the page in case of pagination enabled',
  })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({
    description: 'Size of the page in case of pagination enabled',
  })
  @IsOptional()
  readonly pageSize?: number;

  @ApiProperty({ description: 'Literary genre filter ', example: 'Fantasy' })
  @IsOptional()
  readonly categoryFilter?: string;
}
