import { model, Schema } from 'mongoose';

export const pointSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  latLng: {
    lat: {
      type: String,
      required: true,
    },
    lng: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  categories: [
    {
      type: Schema.Types.ObjectId,
      ref: 'PointCategory',
    },
  ],
});

export const PointsCollection = model('Point', pointSchema);
