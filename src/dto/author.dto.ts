import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAuthorDto {
  @ApiProperty({ description: "Author's name" })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: "Author's lastname" })
  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @ApiProperty({ description: "Auhtor's DNI (national identity document)" })
  @IsNotEmpty()
  @IsString()
  readonly dni: string;

  @ApiProperty({ description: 'Country of birth' })
  @IsNotEmpty()
  @IsString()
  readonly nationality: string;
}
