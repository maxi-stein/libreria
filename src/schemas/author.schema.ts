import { Schema } from 'mongoose';

export const AuthorSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  dni: { type: String, required: true },
  nationality: { type: String, required: true },
});
