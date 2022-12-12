import Router from 'express';
import * as controllers from './controllers';

const router = Router();

router.get('/users', controllers.users);
router.get('/Oneuser/:idUser', controllers.getOneUser);
router.post('/createUser', controllers.createuser);
router.post('/login', controllers.login);

export default router;