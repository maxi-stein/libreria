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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/book.dto';
import { BookService } from './book.service';
import { Response } from 'express';
import * as moment from 'moment';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(
    @Res() response: Response,
    @Body() createBookDto: CreateBookDto,
  ) {
    try {
      try {
        createBookDto.releaseDate = this.getFormattedDate(
          createBookDto.releaseDate,
        );
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          error,
        });
      }

      const book = await this.bookService.createBook(createBookDto);
      return response.status(HttpStatus.OK).json({
        message: 'Book created succesfuly',
        book,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error,
      });
    }
  }

  @Get()
  async getBooks(@Res() response: Response, @Query() query: CreateBookDto) {
    let books;
    if (query.pagination === 'true') {
      //that comparison doesnt look good , i know.
      const page = query.page || 1; //page 1 if no page specified
      const pageSize = query.pageSize || 5; //page 5 if no page specified
      books = await this.bookService.getbooksPage(page, pageSize);
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

  getFormattedDate(date: string): string {
    const twoDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{2}$/;
    const fourDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/;

    if (twoDigitYear.test(date)) {
      const formattedDate = moment(date, 'DD/MM/YY');
      console.log('luego del primer formateo: ', formattedDate);
      return formattedDate.toISOString();
    }
    if (fourDigitYear.test(date)) {
      const formattedDate = moment(date, 'DD/MM/YYYY');
      console.log('luego del primer formateo: ', formattedDate);
      return formattedDate.toISOString();
    } else {
      throw new BadRequestException(
        'Invalid Date. Please use formats DD/MM/YYYY or DD/MM/YY or verify if the date is actually valid',
      );
    }
  }
}
