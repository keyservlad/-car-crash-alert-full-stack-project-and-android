
import { PrismaClient, Users } from '@prisma/client';
import { errorHandler } from '../../utils/errors';
import prisma from '../../client';
import { ICreateUser } from './interfaces/ICreateUser';

export const _getAllUser = async (): Promise<Users[] | null> => {
  const user = await prisma.users.findMany();
  return user;
};

export const _getOneUser = async (id: string): Promise<Users | null> => {
  const user = await prisma.users.findUnique({
    where: {
      id
    }
  });
  return user;
};


export const createUserService = (
  prismaClient: PrismaClient,
): ICreateUser => {
  return {
    async createUser(inputCreateUser) {
      try {
        const userCreate = await prismaClient.users.create({
          data: {
            name: inputCreateUser.inputCreateUser.name,
            email: inputCreateUser.inputCreateUser.email,
            password: inputCreateUser.inputCreateUser.password,
            phone:inputCreateUser.inputCreateUser.phone,
            emergency_contact: inputCreateUser.inputCreateUser.emergency_contact ? inputCreateUser.inputCreateUser.emergency_contact : ""
          }
        });

        return userCreate ? userCreate : null;
      } catch (error) {
        errorHandler(error, null, null, null);
      }

    }
  };
}