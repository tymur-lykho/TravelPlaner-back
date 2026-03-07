import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRouteSchema, updateRouteSchema } from '../validation/route.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addRouteController,
  getAllRoutesController,
  updateRouteController,
} from '../controllers/route.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createRouteSchema),
  ctrlWrapper(addRouteController),
);

router.get('/', ctrlWrapper(getAllRoutesController));

router.patch(
  '/:id',
  authenticate,
  isValidId('id'),
  validateBody(updateRouteSchema),
  ctrlWrapper(updateRouteController),
);

export default router;
