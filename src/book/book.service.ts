import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Book } from 'src/interfaces/book.interface';
import { CreateBookDto } from 'src/dto/book.dto';

@Injectable()
export class BookService {
  //injecting schema Book defined at MongooseModule.forFeature()
  constructor(@InjectModel('Book') private readonly bookModel: Model<Book>) {} //Model<Book> the is the interface

  async getBooks(): Promise<Book[]> {
    const books = await this.bookModel
      .find()
      .populate('publisher')
      .populate('authors');
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
}
