import pr from '../../controllers/pr';
import slackAuth from '../../middleware/slackAuth';
import { Router } from 'express';
const router = Router();

router.use('/', slackAuth.prSlash, pr.getPRData);

export default router;
