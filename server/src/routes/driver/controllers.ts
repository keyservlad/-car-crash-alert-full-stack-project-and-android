import type { Handler } from 'express';
import * as services from './services';
import { Request } from 'express';
import prisma from '../../client';


export const users: Handler = async (req:any, res) => {

    // Get all players
    const user = await services._getAllUser();
    // Return the response
    return res.status(200).json(user);
  };


  export const getOneUser: Handler = async (req: Request, res: any) => {
    const { params } = req
    if (!params.idUser) return;

    // Get all players
    const oneuser = await services._getOneUser(params.idUser);
    // Return the response
    return res.status(200).json(oneuser);
  };

  export const createuser: Handler = async (req: Request, res: any) => {
    const { body } = req
    if (!body.email || !body.password) return;

    // Get all players
    const user = await services.createUserService(prisma).createUser({
      inputCreateUser: {
        name: body.name,
        email: body.email,
        password: body.password,
        phone: body.phone,
        emergency_contact: body.emergency_contact,
      }
    });
    // Return the response
    return res.status(200).json(user);
  };