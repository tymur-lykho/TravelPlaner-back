import { Router } from 'express';
import authRouter from './auth.js';
import pointRouter from './point.js';
import routeRouter from './route.js';
import photoRouter from './photo.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/points', pointRouter);

router.use('/route', routeRouter);

router.use('/photos', photoRouter);

router.use('/users', userRouter);

export default router;
