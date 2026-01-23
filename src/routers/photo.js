import { Router } from 'express';
import {
  addPhotosController,
  deletePhotosByTargetController,
  getPhotosController,
} from '../controllers/photo.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router({ mergeParams: true });

router.post(
  '/',
  authenticate,
  upload.array('photos', 10),
  ctrlWrapper(addPhotosController),
);

router.get('/', ctrlWrapper(getPhotosController));

router.delete('/', authenticate, ctrlWrapper(deletePhotosByTargetController));

export default router;
