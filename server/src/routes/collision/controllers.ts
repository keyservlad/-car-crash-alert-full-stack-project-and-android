import type { Handler } from 'express';
import * as services from './services';
import { Request } from 'express';
import prisma from '../../client';


export const collisions: Handler = async (req: any, res) => {

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

export const createcollision: Handler = async (req: Request, res: any) => {
  const { body } = req
  if (!body.idUser) return;

  // Get all players
  const collision = await services.createCollisionService(prisma).createCollision({
    inputCreateCollision: {
      idUser: body.idUser,
      adresse: body.adresse,
      longitude: body.longitude,
      latitude: body.latitude,
      level: body.level,
      sensorX: body.sensorX,
      sensorY: body.sensorY,
      sensorZ: body.sensorZ,
      dateCollision: body.dateCollision,
      detail: body.detail
    }
  });
  // Return the response
  return res.status(200).json(collision);
}