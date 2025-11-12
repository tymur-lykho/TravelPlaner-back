import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { addPointToFavoriteController } from '../controllers/favoritePoint.js';

const router = Router();

router.use(authenticate);

router.post('/:id', isValidId('id'), ctrlWrapper(addPointToFavoriteController));

export default router;
