import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateBookDto } from 'src/dto/book.dto';

import { Book } from 'src/interfaces/book.interface';
import { Author } from 'src/interfaces/author.interface';
import { Publisher } from 'src/interfaces/publisher.interface';

@Injectable()
export class BookService {
  //injecting schema Book defined at MongooseModule.forFeature()
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
    @InjectModel('Author') private readonly authorModel: Model<Author>,
    @InjectModel('Publisher') private readonly publisherModel: Model<Publisher>,
  ) {}

  async getBooks(categoryFilter?: string): Promise<Book[]> {
    const query = this.bookModel
      .find()
      .populate('publisher')
      .populate('authors');
    console.log(categoryFilter);
    if (categoryFilter) {
      query.where('category').equals(categoryFilter);
    }
    const books = await query.exec();
    return books;
  }

  async getBook(bookId: string): Promise<Book> {
    const book = await this.bookModel
      .findById(bookId)
      .populate('publisher')
      .populate('authors');
    return book;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    await this.validateBook(createBookDto);
    const book = new this.bookModel(createBookDto);
    await book.save();
    return book;
  }

  async deleteBook(bookId: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(bookId);
    return book;
  }

  async updateBook(
    bookId: string,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(bookId, createBookDto, {
      new: true, //new: true makes the function return the new updated book
    });
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
  async getbooksPage(
    page: number,
    pageSize: number,
    categoryFilter?: string,
  ): Promise<Book[]> {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let books = await this.getBooks(categoryFilter);
    books = books.slice(startIndex, endIndex);
    return books;
  }
}
