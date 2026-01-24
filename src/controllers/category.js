import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../services/category.js';

export const addCategoryController = async (req, res) => {
  const category = await addCategory(req.body);

  res.status(200).json({
    status: 200,
    message: 'Category created',
    category,
  });
};

export const updateCategoryController = async (req, res) => {
  const categoryId = req.params.id;
  const category = await updateCategory(categoryId, req.body);

  res.status(200).json({
    status: 200,
    message: 'Category updated',
    category,
  });
};

export const deleteCategoryController = async (req, res) => {
  const categoryId = req.params.id;
  await deleteCategory(categoryId);

  res.status(204).json({
    status: 204,
    message: 'Category has been deleted',
  });
};

export const getCategoriesController = async (req, res) => {
  const categories = await getCategories();

  res.status(200).json({
    status: 200,
    message: 'Categories retrived successfully',
    data: categories,
  });
};
