import Router from 'express';
import * as controllers from './controllers';

const router = Router();

router.get('/collisions', controllers.collisions);
router.get('/Onecollision/:idCollision', controllers.getOneCollsision);
router.post('/createCollision', controllers.createcollision);

export default router;