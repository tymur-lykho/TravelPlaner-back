import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import {
  getMyUserController,
  getUserByIdController,
  getUsersController,
  updateUserAvatarController,
  updateUserController,
} from '../controllers/user.js';
import { updateUserSchema } from '../validation/user.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get('/me', authenticate, ctrlWrapper(getMyUserController));

router.patch(
  '/me',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

router.patch(
  '/me/avatar',
  authenticate,
  upload.single('avatar'),
  ctrlWrapper(updateUserAvatarController),
);

router.get('/:id', isValidId('id'), ctrlWrapper(getUserByIdController));

export default router;
