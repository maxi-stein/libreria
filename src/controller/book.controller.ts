import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { GetBookDto } from 'src/dto/get-book.dto';
import { BookService } from '../service/book.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getBooks(@Res() response: Response, @Query() query: GetBookDto) {
    try {
      const books = await this.bookService.getBooks(
        query.categoryFilter,
        query.pagination,
        query.page,
        query.pageSize,
      );
      return response.status(HttpStatus.OK).json({
        books,
      });
    } catch (error) {
      return response.json({
        error,
      });
    }
  }

  @Get('/:id')
  async getBook(@Param('id') bookId: string, @Res() response: Response) {
    try {
      const book = await this.bookService.getBook(bookId);
      response.status(HttpStatus.OK).json({
        book,
      });
    } catch (error) {
      return response.json({
        error,
      });
    }
  }

  @Post()
  async createBook(
    @Res() response: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    let book;
    try {
      book = await this.bookService.createBook(createBookDto);
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Validation error',
        error: error.message,
      });
    }
    return response.status(HttpStatus.OK).json({
      message: 'Book created succesfuly',
      book,
    });
  }

  @Put('/:id')
  async updateBook(
    @Res() response: Response,
    @Param('id') bookId,
    @Body() createBookDto: CreateBookDto,
  ) {
    const book = await this.bookService.updateBook(bookId, createBookDto);
    response.status(HttpStatus.OK).json({
      book,
    });
  }

  @Delete('/:id')
  async deleteBook(@Param('id') bookId, @Res() response: Response) {
    try {
      const book = await this.bookService.deleteBook(bookId);
      response.status(HttpStatus.OK).json({
        message: 'Book deleted successfuly',
        book,
      });
    } catch (error) {
      return error;
    }
  }
}
