import { veilarbveilederHandlers } from './veilarbveileder';
import { RequestHandler } from 'msw';

export const allHandlers: RequestHandler[] = [
	...veilarbveilederHandlers,
];