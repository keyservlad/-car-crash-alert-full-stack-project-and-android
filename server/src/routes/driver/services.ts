
import { PrismaClient, Users } from '@prisma/client';
import { errorHandler } from '../../utils/errors';
import prisma from '../../client';
import { ICreatePlayer } from './interfaces/ICreatePlayer';
import { XMLElement } from 'xmlbuilder';

export const _getAllPlayer = async (): Promise<Users[] | null> => {
  const user = await prisma.users.findMany();
  return user;
};

export const _getOnePlayer = async (id: string): Promise<Users | null> => {
  const user = await prisma.users.findUnique({
    where: {
      id
    }
  });
  return user;
};


export const createPlayerService = (
  prismaClient: PrismaClient,
): ICreatePlayer => {
  return {
    async createPlayer(inputCreatePlayer) {
      try {
        const playerCreate = await prismaClient.users.create({
          data: {
            name: inputCreatePlayer.inputCreatePlayer.name,
            age: inputCreatePlayer.inputCreatePlayer.age,
            type: inputCreatePlayer.inputCreatePlayer.type,
            pays: inputCreatePlayer.inputCreatePlayer.pays,
          }
        });

        return playerCreate ? playerCreate : null;
      } catch (error) {
        errorHandler(error, null, null, null);
      }

    }
  };
}

export const foraddhtmlHeaders = (doc: XMLElement): XMLElement => {
  return doc.ele("tr")
    .ele("th")
    .text("prenom")
    .up()
    .ele("th")
    .text("nom")
    .up()
    .ele("th")
    .text("age")
    .up()
    .ele("th")
    .text("pays")
    .up()
    .up()
}

export const converttoHTML = (doc: XMLElement, data: Users): XMLElement => {
  return doc.ele("tr")
    // Les attributs du joueur
    .ele("td")
    .text(data.name)
    .up()
    .ele("td")
    .text(data.name)
    .up()
    .ele("td")
    .text(data.age)
    .up()
    .ele("td")
    .text(data.pays)
    .up()
    .up()
}


export const converttoRDFXML = (doc: XMLElement, data: Users): XMLElement=>{
  return doc.ele("rdf:Description")
    .att("rdf:about", "http://localhost:3000/data/player/" + data.id)
    // Les attributs du joueur
    .ele("player:prenom")
    .text(data.name)
    .up()
    .ele("player:nom")
    .text(data.name)
    .up()
    .ele("player:age")
    .text(data.age)
    .up()
    .ele("player:pays")
    .text(data.pays)
    .up()
    .up()

}