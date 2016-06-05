import commandsRoutes from './commands';
import webhooksRoutes from './webhooks';
import { Router } from 'express';
const router = Router();

router.use('/commands', commandsRoutes);
router.use('/webhooks', webhooksRoutes);

export default router;
