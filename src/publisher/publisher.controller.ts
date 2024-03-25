import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
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
    const publisher = await this.publisherService.getPublisher(pbulisherId);
    if (!publisher) throw new NotFoundException('Publisher does not exists.');
    response.status(HttpStatus.OK).json({
      publisher,
    });
  }

  @Post()
  async createPublisher(
    @Res() response: Response,
    @Body() createPublisherDto: CreatePublisherDto,
  ) {
    if (!this.validateCuit(createPublisherDto.cuit)) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        error: 'CUIT is not valid.',
      });
    }
    const publisher =
      await this.publisherService.createPublisher(createPublisherDto);
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
    const publisher = await this.publisherService.updatePublisher(
      pbulisherId,
      createPublisherDto,
    );
    if (!publisher) throw new NotFoundException('Publisher does not exists');
    response.status(HttpStatus.OK).json({
      publisher,
    });
  }

  @Delete('/:id')
  async deletePublisher(@Param('id') pbulisherId, @Res() response: Response) {
    const publisher = await this.publisherService.deletePublisher(pbulisherId);
    if (!publisher) throw new NotFoundException('Publisher does not exists.');
    response.status(HttpStatus.OK).json({
      message: 'Publisher deleted successfuly',
      publisher,
    });
  }

  validateCuit(cuit: string): boolean {
    const regex: RegExp = /^[1-9]{2}-\d{8}-\d{1}$/;
    return regex.test(cuit);
  }
}
