import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { Book } from 'src/interfaces/book.interface';
import { Author } from 'src/interfaces/author.interface';
import { Publisher } from 'src/interfaces/publisher.interface';
import * as moment from 'moment';

@Injectable()
export class BookService {
  //injecting schema Book defined at MongooseModule.forFeature()
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('Author') private readonly authorModel: Model<Author>,
    @InjectModel('Publisher') private readonly publisherModel: Model<Publisher>,
  ) {}

  async getBooks(
    categoryFilter?: string,
    pagination?: boolean,
    page?: number,
    pageSize?: number,
  ): Promise<Book[]> {
    const query = this.bookModel
      .find()
      .populate('publisher')
      .populate('authors'); //populating authors and publishers
    if (categoryFilter) {
      query.where('category').equals(categoryFilter); //category filter is specified
    }

    let books = await query.exec();

    if (pagination) {
      if (page && pageSize) {
        //pagination is allowed only if page number and page size is specified
        if (page <= 0 || pageSize <= 0) {
          throw new BadRequestException(
            'page and pageSize must be greater than 0',
          );
        }
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        books = books.slice(startIndex, endIndex);
        if (books.length == 0) {
          throw new BadRequestException(
            'No books found for page ' + page + ' with size of ' + pageSize,
          );
        }
      }
    }

    return books;
  }

  async getBook(bookId: string): Promise<Book> {
    const book = await this.bookModel
      .findById(bookId)
      .populate('publisher')
      .populate('authors');
    if (!book) throw new NotFoundException('Book does not exists.');
    return book;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    await this.validateBook(createBookDto);
    createBookDto.releaseDate = this.getFormattedDate(
      createBookDto.releaseDate,
    );
    const book = new this.bookModel(createBookDto);
    await book.save();
    return book;
  }

  async deleteBook(bookId: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(bookId);
    if (!book) throw new NotFoundException('Book does not exists.');
    return book;
  }

  async updateBook(
    bookId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(bookId, createBookDto, {
      new: true, //'new: true' makes the function return the new updated book instead of the old one.
    });
    if (!book) throw new NotFoundException('Book does not exists');
    return book;
  }

  //checks if author and publisher exist in the database
  async validateBook(createBookDto: CreateBookDto) {
    // Checking if every authors exist
    const authorPromises = createBookDto.authors.map((authorId) => {
      return this.authorModel.exists({ _id: authorId });
    });
    const authorExistsArray = await Promise.all(authorPromises);

    // iterating every result of the promise to see if at least one id was not found
    const allAuthorsExist = authorExistsArray.every(
      (authorExists) => authorExists, //check if every result is true
    );

    //checks if the publisher exists
    const publisherExists = await this.publisherModel.exists({
      _id: createBookDto.publisher,
    });

    if (!allAuthorsExist) {
      throw new NotFoundException('Author not found.');
    }

    if (publisherExists === null) {
      throw new NotFoundException('Publisher not found.');
    }
  }

  getFormattedDate(date: string): string {
    const twoDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{2}$/;
    const fourDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/;

    if (date) {
      if (twoDigitYear.test(date)) {
        const formattedDate = moment(date, 'DD/MM/YY');
        return formattedDate.toISOString();
      }
      if (fourDigitYear.test(date)) {
        const formattedDate = moment(date, 'DD/MM/YYYY');
        return formattedDate.toISOString();
      }
    }

    throw new BadRequestException(
      'Invalid Date. Please use formats DD/MM/YYYY or DD/MM/YY or verify if the date is actually valid',
    );
  }
}
