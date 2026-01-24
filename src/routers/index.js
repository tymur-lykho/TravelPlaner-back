import { Router } from 'express';
import authRouter from './auth.js';
import pointRouter from './point.js';
import routeRouter from './route.js';
import photoRouter from './photo.js';
import userRouter from './user.js';
import categoryRouter from './category.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/points', pointRouter);

router.use('/route', routeRouter);

router.use('/photos', photoRouter);

router.use('/users', userRouter);

router.use('/categories', categoryRouter);

export default router;
