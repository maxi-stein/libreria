import { Module } from '@nestjs/common';
import { BookModule } from './module/book.module';
import { AuthorModule } from './module/author.module';
import { PublisherModule } from './module/publisher.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [BookModule, AuthorModule, PublisherModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
