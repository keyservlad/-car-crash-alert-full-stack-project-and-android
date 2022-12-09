import assert from 'assert';
import type { Handler } from 'express';
import { SimpleError } from '../../utils/errors/';
import * as services from './services';
import { Request } from 'express';

export const players: Handler = async (req:any, res) => {

    // Get all players
    const user = await services._getAllPlayer();
    // Return the response
    return res.status(200).json(user);
  };


  export const getOnePlayer: Handler = async (req: Request, res: any) => {
    const { params } = req
    if (!params.idPlayer) return;

    // Get all players
    const oneplayer = await services._getOnePlayer(params.idPlayer);
    // Return the response
    return res.status(200).json(oneplayer);
  };