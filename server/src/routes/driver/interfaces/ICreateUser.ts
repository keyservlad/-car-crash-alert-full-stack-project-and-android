import {  Users } from '@prisma/client';
import { InputCreateUser } from './input/InputCreateUser';

export interface ICreateUser {
	createUser: (
		inputCreateUser: InputCreateUser
	) => Promise<Users | undefined | null>;
}
