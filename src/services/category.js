import { CategoriesCollection } from '../db/models/category.js';

export const addCategory = async (payload) => {
  return await CategoriesCollection.create(payload);
};

export const updateCategory = async (catedoryId, payload) => {
  const category = await CategoriesCollection.findById(catedoryId);

  if (!category) throw createHttpError(404, 'Category is not defined');

  return await CategoriesCollection.updateOne({ _id: catedoryId }, payload);
};

export const deleteCategory = async (categoryId) => {
  const result = await CategoriesCollection.deleteOne({
    _id: categoryId,
  });

  let otherCategory = await CategoriesCollection.find({ slug: 'other' });

  if (!otherCategory.length) {
    otherCategory = await CategoriesCollection.create({
      name: 'Other',
      slug: 'other',
      type: 'both',
    });
  }

  await CategoriesCollection.updateMany(
    { parent: categoryId },
    { parent: otherCategory._id },
  );

  return result;
};

export const getCategories = async () => {
  return CategoriesCollection.find();
};
