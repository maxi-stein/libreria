import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ description: 'Array of authors ID for the book' })
  @IsNotEmpty()
  @IsArray()
  readonly authors: string[];

  @ApiProperty({ description: "Publisher's id" })
  @IsNotEmpty()
  @IsString()
  readonly publisher: string;

  @ApiProperty({ description: "Book's title" })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ description: "Book's literary genre" })
  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @ApiProperty({ description: "Book's price" })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({
    description:
      "Book's release date. The acceptable date format is dd/mm/yyyy or dd/mm/yy",
  })
  @IsNotEmpty()
  @IsString()
  releaseDate: string;

  @ApiProperty({ description: "Book's description" })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
