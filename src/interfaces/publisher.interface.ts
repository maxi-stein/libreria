import { Document } from 'mongoose';

export interface Publisher extends Document {
  name: string;
  address: string;
  cuit: string;
}
