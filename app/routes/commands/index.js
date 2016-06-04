import prRoute from './pr';
import { Router } from 'express';
const router = Router();

router.use('/pr', prRoute);

export default router;
