import { model, Schema } from 'mongoose';

export const pointCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

export const PointCategoriesCollection = model(
  'PointCategory',
  pointCategorySchema,
);
