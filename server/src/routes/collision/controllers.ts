import type { Handler } from 'express';
import * as services from './services';
import { Request } from 'express';

export const collisions: Handler = async (req:any, res) => {

    // Get all players
    const user = await services._getAllCollision();
    // Return the response
    return res.status(200).json(user);
  };


  export const getOneCollsision: Handler = async (req: Request, res: any) => {
    const { params } = req
    if (!params.idCollision) return;

    // Get all players
    const oneuser = await services._getOneCollision(params.idCollision);
    // Return the response
    return res.status(200).json(oneuser);
  };