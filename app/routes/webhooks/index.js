import github from '../../handlers/github';
import { Router } from 'express';
const router = Router();

router.use('/github', github.notifySubscribers);

export default router;
