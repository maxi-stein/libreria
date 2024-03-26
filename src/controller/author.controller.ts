import {
  Controller,
  HttpStatus,
  Res,
  Get,
  Put,
  Param,
  Body,
  Delete,
  Post,
} from '@nestjs/common';
import { AuthorService } from '../service/author.service';
import { CreateAuthorDto } from 'src/dto/author.dto';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('authors')
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
    let author;
    try {
      author = await this.authorService.getAuthor(authorId);
    } catch (error) {
      return response.status(error.status).json({
        error,
      });
    }
    response.status(HttpStatus.OK).json({
      author,
    });
  }

  @Post()
  async createAuthor(
    @Res() response: Response,
    @Body() createAuthorDto: CreateAuthorDto,
  ) {
    let author;
    try {
      author = await this.authorService.createAuthor(createAuthorDto);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
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
    let author;
    try {
      author = await this.authorService.updateAuthor(authorId, createAuthorDto);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
    response.status(HttpStatus.OK).json({
      author,
    });
  }

  @Delete('/:id')
  async deleteAuthor(@Param('id') authorId, @Res() response: Response) {
    let author;
    try {
      author = await this.authorService.deleteAuthor(authorId);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }

    response.status(HttpStatus.OK).json({
      message: 'Author deleted successfuly',
      author,
    });
  }
}
