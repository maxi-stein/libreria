import { Schema } from 'mongoose';

export const PublisherSchema = new Schema({
  name: String,
  address: String,
  cuit: String,
});
