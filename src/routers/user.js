import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { validateBody } from '../middlewares/validateBody';
import { isValidId } from '../middlewares/isValidId';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

// router.get('/:id', isValidId('id'), ctrlWrapper(getUserById));

router.use(authenticate);

// router.patch(
//   '/:id',
//   isValidId('id'),
//   validateBody(updateUserSchema),
//   ctrlWrapper(updateUserController),
// );

// router.patch(
//   '/:id/avatar',
//   isValidId('id'),
//   upload.single('avatar'),
//   ctrlWrapper(updateUserAvatarController),
// );

export default router;
