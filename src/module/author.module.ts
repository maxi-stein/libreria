import { Module } from '@nestjs/common';
import { AuthorController } from '../controller/author.controller';
import { AuthorService } from '../service/author.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from 'src/schemas/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Author', schema: AuthorSchema, collection: 'author' },
    ]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
