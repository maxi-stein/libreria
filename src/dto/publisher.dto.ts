import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({ description: "Publisher's name" })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description:
      "Publisher's address. Please specify address, postal, city and country",
  })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({
    description:
      "Publisher's CUIT. Consists of 2 digits, 1 colon, 8 digits, 1 colon and 1 addition digit.",
    example: '23-34460293-2',
  })
  @IsNotEmpty()
  @IsString()
  readonly cuit: string;
}
