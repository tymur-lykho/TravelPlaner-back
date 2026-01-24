import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../validation/category.js';
import {
  addCategoryController,
  deleteCategoryController,
  getCategoriesController,
  updateCategoryController,
} from '../controllers/category.js';

const router = Router();

router.get('/', ctrlWrapper(getCategoriesController));

router.post(
  '/',
  authenticate,
  validateBody(createCategorySchema),
  ctrlWrapper(addCategoryController),
);

router.patch(
  '/:id',
  authenticate,
  isValidId('id'),
  validateBody(updateCategorySchema),
  ctrlWrapper(updateCategoryController),
);

router.delete(
  '/:id',
  authenticate,
  isValidId('id'),
  ctrlWrapper(deleteCategoryController),
);

export default router;
