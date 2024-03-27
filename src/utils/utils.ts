import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { Model } from 'mongoose';
import { CreateBookDto } from 'src/dto/create-book.dto';
import { Author } from 'src/interfaces/author.interface';
import { Publisher } from 'src/interfaces/publisher.interface';

export function validateDni(dni: string) {
  const regex: RegExp = /^[1-9]{1}\d{7}$/;
  if (!regex.test(dni)) {
    throw new BadRequestException('DNI is not valid');
  }
}

export function getFormattedDate(date: string): string {
  const twoDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{2}$/;
  const fourDigitYear = /^[0-3][0-9]\/[0-1][0-9]\/\d{4}$/;

  if (date) {
    if (twoDigitYear.test(date)) {
      const formattedDate = moment(date, 'DD/MM/YY');
      return formattedDate.toISOString();
    }
    if (fourDigitYear.test(date)) {
      const formattedDate = moment(date, 'DD/MM/YYYY');
      return formattedDate.toISOString();
    }
  }
  throw new BadRequestException(
    'Invalid Date. Please use formats DD/MM/YYYY or DD/MM/YY or verify if the date is actually valid',
  );
}

//checks if author and publisher exist in the database
export async function validateBook(
  createBookDto: CreateBookDto,
  authorModel: Model<Author>,
  publisherModel: Model<Publisher>,
) {
  // Checking if every authors exist
  const authorPromises = createBookDto.authors.map((authorId) => {
    return authorModel.exists({ _id: authorId });
  });
  const authorExistsArray = await Promise.all(authorPromises);

  // iterating every result of the promise to see if at least one id was not found
  const allAuthorsExist = authorExistsArray.every(
    (authorExists) => authorExists, //check if every result is true
  );

  if (!allAuthorsExist) {
    throw new NotFoundException('At least one author was not found.');
  }

  //checks if the publisher exists
  const publisherExists = await publisherModel.exists({
    _id: createBookDto.publisher,
  });

  if (publisherExists == null) {
    throw new NotFoundException('Publisher not found.');
  }
}

export function validateCuit(cuit: string): void {
  const regex: RegExp = /^[1-9]{2}-\d{8}-\d{1}$/;
  if (!regex.test(cuit)) {
    throw new BadRequestException('CUIT is not valid');
  }
}
