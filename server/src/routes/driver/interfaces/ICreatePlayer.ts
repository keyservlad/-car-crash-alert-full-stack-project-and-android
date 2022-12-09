import {  Users } from '@prisma/client';
import { InputCreatePlayer } from './input/InputCreatePlayer';

export interface ICreatePlayer {
	createPlayer: (
		inputCreatePlayer: InputCreatePlayer
	) => Promise<Users | undefined | null>;
}
