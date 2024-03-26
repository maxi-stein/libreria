import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Author } from 'src/interfaces/author.interface';
import { CreateAuthorDto } from 'src/dto/author.dto';
import { validateDni } from 'src/utils/utils';

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
    if (!author) throw new NotFoundException('Author does not exists.');
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    try {
      validateDni(createAuthorDto.dni);
    } catch (error) {
      throw error;
    }
    const author = await this.authorModel.create(createAuthorDto);
    return author;
  }

  async updateAuthor(
    authorId: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    const author = await this.authorModel.findByIdAndUpdate(
      authorId,
      createAuthorDto,
      { new: true },
    );
    if (!author) throw new NotFoundException('Author does not exists');
    return author;
  }

  async deleteAuthor(authorId: string): Promise<Author> {
    const author = await this.authorModel.findByIdAndDelete(authorId);
    if (!author) throw new NotFoundException('Author does not exists.');
    return author;
  }
}
