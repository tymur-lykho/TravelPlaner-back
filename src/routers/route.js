import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createRouteSchema } from '../validation/route.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addRouteController } from '../controllers/route.js';

const router = Router();

router.post(
  '/',
  authenticate,
  validateBody(createRouteSchema),
  ctrlWrapper(addRouteController),
);

export default router;
