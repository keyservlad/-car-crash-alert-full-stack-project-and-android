import Router from 'express';
import * as controllers from './controllers';

const router = Router();

router.get('/players',controllers.players);
router.get('/Oneplayer/:idPlayer',controllers.getOnePlayer);

export default router;