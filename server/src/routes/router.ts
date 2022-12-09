import  Router  from 'express';
import { collisions } from './collision/controllers';
import { users } from './driver/controllers';


const router = Router();

router.use('/api_user', users);
router.use('/api_collision', collisions);

export default router;