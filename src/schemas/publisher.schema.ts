import { Schema } from 'mongoose';

export const PublisherSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  cuit: { type: String, required: true },
});
