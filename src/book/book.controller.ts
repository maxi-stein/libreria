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
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(
    @Res() response: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    const book = await this.bookService.createBook(createBookDto);
    return response.status(HttpStatus.OK).json({
      message: 'created succesfuly',
      book,
    });
  }

  @Get()
  async getBooks(@Res() response: Response) {
    const books = await this.bookService.getBooks();
    response.status(HttpStatus.OK).json({
      books,
    });
  }

  @Get('/:id')
  async getBook(@Param('id') bookId, @Res() response: Response) {
    const book = await this.bookService.getBook(bookId);
    if (!book) throw new NotFoundException('Book does not exists.');
    await book.populate('publisher'); //'publisher' is the name of the field
    await book.populate('authors'); //'authors' is the name of the field
    response.status(HttpStatus.OK).json({
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
    if (!book) throw new NotFoundException('Book does not exists');
    response.status(HttpStatus.OK).json({
      book,
    });
  }

  @Delete('/:id')
  async deleteBook(@Param('id') bookId, @Res() response: Response) {
    const book = await this.bookService.deleteBook(bookId);
    if (!book) throw new NotFoundException('Book does not exists.');
    response.status(HttpStatus.OK).json({
      message: 'Book deleted successfuly',
      book,
    });
  }
}
