import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateAuthorDto {
  @ApiProperty({ description: "Author's name" })
  @IsNotEmpty()
  readonly name: string;
  @ApiProperty({ description: "Author's lastname" })
  @IsNotEmpty()
  readonly surname: string;
  @ApiProperty({ description: "Auhtor's DNI (national identity document)" })
  @IsNotEmpty()
  readonly dni: string;
  @ApiProperty({ description: 'Country of birth' })
  @IsNotEmpty()
  readonly nationality: string;
}
