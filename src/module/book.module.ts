import { Module } from '@nestjs/common';
import { BookController } from '../controller/book.controller';
import { BookService } from '../service/book.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from 'src/schemas/book.schema';
import { AuthorSchema } from 'src/schemas/author.schema';
import { PublisherSchema } from 'src/schemas/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Book', schema: BookSchema, collection: 'book' },
      { name: 'Author', schema: AuthorSchema, collection: 'author' },
      { name: 'Publisher', schema: PublisherSchema, collection: 'publisher' },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
