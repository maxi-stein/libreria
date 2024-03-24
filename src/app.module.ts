import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { EditorialModule } from './editorial/editorial.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BookModule, AuthorModule, EditorialModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
