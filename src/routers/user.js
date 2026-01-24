import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { upload } from '../middlewares/multer.js';
import { getUsersController } from '../controllers/user.js';

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
