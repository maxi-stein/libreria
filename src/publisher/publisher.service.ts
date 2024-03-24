import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublisherDto } from 'src/dto/publisher.dto';
import { Publisher } from 'src/interfaces/publisher.interface';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel('Publisher') private readonly publisherModel: Model<Publisher>,
  ) {}

  async getPublishers(): Promise<Publisher[]> {
    const publishers = await this.publisherModel.find();
    return publishers;
  }

  async getPublisher(publisherId: string): Promise<Publisher> {
    const publisher = await this.publisherModel.findById(publisherId);
    return publisher;
  }

  async createPublisher(
    createPublisher: CreatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.publisherModel.create(createPublisher);
    return publisher;
  }

  async updatePublisher(
    publisherId: string,
    createPublisher: CreatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.publisherModel.findByIdAndUpdate(
      publisherId,
      createPublisher,
      { new: true },
    );
    return publisher;
  }

  async deletePublisher(publisherId: string): Promise<Publisher> {
    const publisher = await this.publisherModel.findByIdAndDelete(publisherId);
    return publisher;
  }
}
