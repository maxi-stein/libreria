import { Document } from 'mongoose';

export interface Book extends Document {
  authors: string[];
  editorial: string;
  title: string;
  category: string;
  price: number;
  releaseDate: string;
  description: string;
}
