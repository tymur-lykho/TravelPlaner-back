import { model, Schema } from 'mongoose';

export const pointSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  photos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  lngLat: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

pointSchema.index({ latLng: '2dsphere' });

export const PointsCollection = model('Point', pointSchema);
