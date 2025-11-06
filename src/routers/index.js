import { Router } from 'express';
import authRouter from './auth.js';
import pointRouter from './point.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/points', pointRouter);

export default router;
