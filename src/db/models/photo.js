import { model, Schema } from 'mongoose';

export const photoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const PhotosCollection = model('Photo', photoSchema);
