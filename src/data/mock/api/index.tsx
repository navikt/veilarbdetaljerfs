import { veilarboppfolgingHandlers } from './veilarboppfolgning';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';
import { RequestHandler } from 'msw';

export const allHandlers: RequestHandler[] = [
	...veilarbveilederHandlers,
	...veilarbpersonHandlers,
	...veilarboppfolgingHandlers,
];