import { TypeUser } from '@prisma/client';

export interface InputCreatePlayer {
    // root type
    inputCreatePlayer: {
        name: string;
        age: string;
        pays: string;
        type: TypeUser;
    };
}