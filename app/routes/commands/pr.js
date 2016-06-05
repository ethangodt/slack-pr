import pr from '../../controllers/pr';
import slackAuth from '../../middleware/slackAuth';
import { Router } from 'express';
const router = Router();

// always call slackAuth
router.post('/', slackAuth.prSlash);

// 'basic' route is skipped when a user wants to subscribe to a PR
router.post('/', pr.skipToSubChain, pr.getPRData);

// 'sub' route
router.post('/', pr.setupSubscription);

export default router;
