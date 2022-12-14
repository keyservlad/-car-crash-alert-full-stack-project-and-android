import  Router  from 'express';
import users from './driver';
import collisions from './collision';


const router = Router();

router.use('/api_user', users);
router.use('/api_collision', collisions);

export default router;