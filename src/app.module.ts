import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { PublisherModule } from './publisher/publisher.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BookModule, AuthorModule, PublisherModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
