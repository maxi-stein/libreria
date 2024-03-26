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
  Query,
} from '@nestjs/common';
import { CreateBookDto, GetBookDto } from 'src/dto/book.dto';
import { BookService } from '../service/book.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(
    @Res() response: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      const book = await this.bookService.createBook(createBookDto);
      return response.status(HttpStatus.OK).json({
        message: 'Book created succesfuly',
        book,
      });
    } catch (error) {
      return error;
    }
  }

  @Get()
  async getBooks(@Res() response: Response, @Query() query: GetBookDto) {
    let books;
    if (query.pagination) {
      const page = query.page || 1; //page 1 if no page specified
      const pageSize = query.pageSize || 5; //pageSize 5 if no pageSize specified
      let category;
      if (query.categoryFilter) {
        category = query.categoryFilter;
      }
      books = await this.bookService.getbooksPage(page, pageSize, category);
      response.status(HttpStatus.OK).json({
        books,
      });
    } else {
      books = await this.bookService.getBooks();
      response.status(HttpStatus.OK).json({
        books,
      });
    }
  }

  @Get('/:id')
  async getBook(@Param('id') bookId: string, @Res() response: Response) {
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
