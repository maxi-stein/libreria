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
import { getFormattedDate, validateBook } from 'src/utils/utils';

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
    try {
      await validateBook(createBookDto, this.authorModel, this.publisherModel);
    } catch (error) {
      throw error;
    }
    createBookDto.releaseDate = getFormattedDate(createBookDto.releaseDate);
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
}
