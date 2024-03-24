import {
  Controller,
  HttpStatus,
  Res,
  Get,
  NotFoundException,
  Put,
  Param,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from 'src/dto/author.dto';
import { Response } from 'express';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Get()
  async getAuthors(@Res() response: Response) {
    const authors = await this.authorService.getAuthors();
    response.status(HttpStatus.OK).json({
      authors,
    });
  }

  @Get('/:id')
  async getAuthor(@Param('id') authorId, @Res() response: Response) {
    const author = await this.authorService.getAuthor(authorId);
    if (!author) throw new NotFoundException('Author does not exists.');
    response.status(HttpStatus.OK).json({
      author,
    });
  }

  @Post()
  async createAuthor(
    @Res() response: Response,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    const author = await this.authorService.createAuthor(createAuthorDto);
    return response.status(HttpStatus.OK).json({
      message: 'Author created succesfuly',
      author,
    });
  }

  @Put('/:id')
  async updateAuthor(
    @Res() response: Response,
    @Param('id') authorId,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    const author = await this.authorService.updateAuthor(
      authorId,
      createAuthorDto,
    );
    if (!author) throw new NotFoundException('Author does not exists');
    response.status(HttpStatus.OK).json({
      author,
    });
  }

  @Delete('/:id')
  async deleteAuthor(@Param('id') authorId, @Res() response: Response) {
    const author = await this.authorService.deleteAuthor(authorId);
    if (!author) throw new NotFoundException('Author does not exists.');
    response.status(HttpStatus.OK).json({
      message: 'Author deleted successfuly',
      author,
    });
  }
}
