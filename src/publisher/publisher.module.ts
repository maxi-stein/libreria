import { Module } from '@nestjs/common';
import { PublisherController } from './publisher.controller';
import { PublisherService } from './publisher.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherSchema } from 'src/schemas/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publisher', schema: PublisherSchema, collection: 'publisher' },
    ]),
  ],
  controllers: [PublisherController],
  providers: [PublisherService],
})
export class PublisherModule {}
