import commandsRoutes from './commands';
import { Router } from 'express';
const router = Router();

router.use('/commands', commandsRoutes);

export default router;



