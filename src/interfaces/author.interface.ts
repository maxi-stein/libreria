import { Document } from 'mongoose';

export interface Author extends Document {
  name: string;
  surname: string;
  dni: string;
  nationality: string;
}
