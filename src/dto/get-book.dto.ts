import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetBookDto {
  @ApiProperty({
    description: "Book's pagination toggle. Possible values:true or false",
    enum: ['true', 'false'],
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly pagination?: boolean;

  @ApiProperty({
    description: 'Number of the page in case of pagination enabled',
  })
  @IsOptional()
  @IsNumber()
  readonly page?: number;

  @ApiProperty({
    description: 'Size of the page in case of pagination enabled',
  })
  @IsOptional()
  @IsNumber()
  readonly pageSize?: number;

  @ApiProperty({ description: 'Literary genre filter ', example: 'Fantasy' })
  @IsOptional()
  @IsString()
  readonly categoryFilter?: string;
}
