import {  Collision } from '@prisma/client';
import { InputCreateCollision } from './input/InputCreateCollision';

export interface ICreateCollision {
	createCollision: (
		inputCreateCollision: InputCreateCollision
	) => Promise<Collision | undefined | null>;
}
