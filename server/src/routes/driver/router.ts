import Router from 'express';
import * as controllers from './controllers';

const router = Router();

router.get('/users', controllers.users);
router.get('/Oneuser/:idUser', controllers.getOneUser);

export default router;