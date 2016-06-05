// import github from './github';
import { Router } from 'express';
const router = Router();

router.use('/github', function (req, res, next) {
	console.log(req.body);
	res.end();
});

export default router;
