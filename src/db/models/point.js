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
      ref: 'Category',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

pointSchema.index({ lngLat: '2dsphere' });
pointSchema.index({ categories: 1 });

export const PointsCollection = model('Point', pointSchema);
