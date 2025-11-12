import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { addPointSchema, updatePointSchema } from '../validation/point.js';
import {
  addPointController,
  deletePointByIdController,
  getAllPointsController,
  getUserPointsController,
  updatePointController,
} from '../controllers/point.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(addPointSchema),
  ctrlWrapper(addPointController),
);

router.delete(
  '/:id',
  authenticate,
  isValidId('id'),
  ctrlWrapper(deletePointByIdController),
);

router.get('/', ctrlWrapper(getAllPointsController));

router.get('/my', authenticate, ctrlWrapper(getUserPointsController));

router.patch(
  '/:id',
  authenticate,
  isValidId('id'),
  validateBody(updatePointSchema),
  ctrlWrapper(updatePointController),
);

export default router;
