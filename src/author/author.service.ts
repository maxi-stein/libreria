import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/interfaces/author.interface';
import { CreateAuthorDto } from 'src/dto/author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel('Author') private readonly authorModel: Model<Author>,
  ) {}

  async getAuthors(): Promise<Author[]> {
    const authors = await this.authorModel.find();
    return authors;
  }

  async getAuthor(authorId: string): Promise<Author> {
    const author = await this.authorModel.findById(authorId);
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = await this.authorModel.create(createAuthorDto);
    return author;
  }

  async updateAuthor(authorId: string, createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = await this.authorModel.findByIdAndUpdate(
      authorId,
      createAuthorDto,
      { new: true },
    );
    return author;
  }

  async deleteAuthor(authorId: string): Promise<Author> {
    const author = await this.authorModel.findByIdAndDelete(authorId);
    return author;
  }
}
