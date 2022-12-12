import type { Handler } from 'express';
import * as services from './services';
import { Request } from 'express';
import prisma from '../../client';
import { comparePassword, hashPassword } from '../../utils/utils';


export const users: Handler = async (req: any, res) => {

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

  const userExists = await prisma.users.findFirst({ where: { email: body.email } });

  if (userExists) {
    // TODO throw Joi error if possible, assuming the above check is async
    return res.status(400).json({
      message: "Email is already taken",
    });
  }


  // Get all players
  const user = await services.createUserService(prisma).createUser({
    inputCreateUser: {
      name: body.name,
      email: body.email,
      password: await hashPassword(body.password),
      phone: body.phone,
      emergency_contact: body.emergency_contact,
    }
  });

  // // Send the email
  // const { mailer } = req.app.locals;
  // await mailer.sendMail(confirmationEmail(email, user.id));

  // Return the response
  return res.status(200).json(user);
};

export const login: Handler = async (req: Request, res: any) => {
  const { body } = req
  if (!body.email || !body.password) return;

  const user = await prisma.users.findFirst({ where: { email: body.email } });

  // NOTE even if the user doesn't exist, we still hash the plaintext
  // password. Although inefficient, this helps mitigate a timing attack.
  const fakeHash =
    "$2b$12$tLn0rFkPBoE1WCpdM6MjR.t/h6Wzql1kAd27FecEDtjRYsTFlYlWa"; // 'test'
  const pwdHash = user?.password || fakeHash;
  const pwdMatches = await comparePassword(body.password, pwdHash);

  if (!user || !pwdMatches) {
    // Return 401 for invalid creds https://stackoverflow.com/a/32752617
    return res.status(401).json({
      message: "Email or password is incorrect",
    });
  }


  // Return the response
  return res.status(200).json(user);
};