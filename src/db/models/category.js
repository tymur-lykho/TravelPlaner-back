import { model, Schema } from 'mongoose';

export const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  type: { type: String, enum: ['point', 'route', 'both'], required: true },
  icon: String,
});

categorySchema.index({ slug: 1 });

export const CategoriesCollection = model('Category', categorySchema);
