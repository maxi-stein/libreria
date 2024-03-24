import { Schema } from 'mongoose';

export const BookSchema = new Schema({
  authors: [{ type: String }],
  editorial: String,
  title: String,
  category: String,
  price: Number,
  releaseDate: {
    type: Date,
    default: Date.now,
  },
  description: String,
});
