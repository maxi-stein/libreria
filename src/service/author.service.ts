import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    if (!author) throw new NotFoundException('Author does not exists.');
    return author;
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    this.validateDni(createAuthorDto.dni);
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

  validateDni(dni: string) {
    const regex: RegExp = /^[1-9]{1}\d{7}$/;
    if (!regex.test(dni)) {
      throw new BadRequestException('DNI is not valid');
    }
  }
}
