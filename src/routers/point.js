import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { addPointSchema } from '../validation/point.js';
import {
  addPointController,
  deletePointByIdController,
  getAllPointsController,
  getUserPointsController,
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

export default router;
