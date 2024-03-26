import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PublisherService } from '../service/publisher.service';
import { Response } from 'express';
import { CreatePublisherDto } from 'src/dto/publisher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('publisher')
@Controller('publishers')
export class PublisherController {
  constructor(private publisherService: PublisherService) {}

  @Get()
  async getPublishers(@Res() response: Response) {
    const publishers = await this.publisherService.getPublishers();
    response.status(HttpStatus.OK).json({
      publishers,
    });
  }

  @Get('/:id')
  async getPublisher(
    @Param('id') pbulisherId: string,
    @Res() response: Response,
  ) {
    try {
      const publisher = await this.publisherService.getPublisher(pbulisherId);
      response.status(HttpStatus.OK).json({
        publisher,
      });
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createPublisher(
    @Res() response: Response,
    @Body() createPublisherDto: CreatePublisherDto,
  ) {
    let publisher;
    try {
      publisher =
        await this.publisherService.createPublisher(createPublisherDto);
    } catch (error) {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: error.message });
    }
    return response.status(HttpStatus.OK).json({
      message: 'Publisher created succesfuly',
      publisher,
    });
  }

  @Put('/:id')
  async updatePublisher(
    @Res() response: Response,
    @Param('id') pbulisherId,
    @Body() createPublisherDto: CreatePublisherDto,
  ) {
    try {
      const publisher = await this.publisherService.updatePublisher(
        pbulisherId,
        createPublisherDto,
      );
      response.status(HttpStatus.OK).json({
        publisher,
      });
    } catch (error) {
      return error;
    }
  }

  @Delete('/:id')
  async deletePublisher(@Param('id') pbulisherId, @Res() response: Response) {
    try {
      const publisher =
        await this.publisherService.deletePublisher(pbulisherId);
      response.status(HttpStatus.OK).json({
        message: 'Publisher deleted successfuly',
        publisher,
      });
    } catch (error) {
      return error;
    }
  }
}
