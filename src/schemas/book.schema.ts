import { Schema, Types } from 'mongoose';

export const BookSchema = new Schema({
  authors: [{ type: Types.ObjectId, ref: 'Author', required: true }],
  publisher: { type: Types.ObjectId, ref: 'Publisher', required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  releaseDate: {
    type: String,
    default: Date.now,
  },
  description: { type: String, required: true },
});
