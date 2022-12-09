
import { PrismaClient, Collision } from '@prisma/client';
import { errorHandler } from '../../utils/errors';
import prisma from '../../client';
import { ICreateCollision } from './interfaces/ICreateCollision';

export const _getAllCollision = async (): Promise<Collision[] | null> => {
  const collision = await prisma.collision.findMany();
  return collision;
};

export const _getOneCollision = async (id: string): Promise<Collision | null> => {
  const collision = await prisma.collision.findUnique({
    where: {
      id
    }
  });
  return collision;
};


export const createCollisionService = (
  prismaClient: PrismaClient,
): ICreateCollision => {
  return {
    async createCollision(inputCreateCollision) {
      try {
        const collisionCreate = await prismaClient.collision.create({
          data: {
            user: { connect: { id: inputCreateCollision.inputCreateCollision.idUser } },
            longitude: inputCreateCollision.inputCreateCollision.longitude,
            latitude: inputCreateCollision.inputCreateCollision.latitude,
            adresse: inputCreateCollision.inputCreateCollision.adresse,
            dateCollision: inputCreateCollision.inputCreateCollision.dateCollision,
            sensorX: inputCreateCollision.inputCreateCollision.sensorX,
            sensorY: inputCreateCollision.inputCreateCollision.sensorY,
            sensorZ: inputCreateCollision.inputCreateCollision.sensorZ,
            level: inputCreateCollision.inputCreateCollision.level,
            detail: inputCreateCollision.inputCreateCollision.detail ? inputCreateCollision.inputCreateCollision.detail : ""
          }
        });

        return collisionCreate ? collisionCreate : null;
      } catch (error) {
        errorHandler(error, null, null, null);
      }

    }
  };
}