import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarbfilterHandlers } from './veilarbfilter';
import { RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte.ts';

export const DEFAULT_DELAY_MILLISECONDS: number = 100;

export const allHandlers: RequestHandler[] = [
    ...veilarbveilederHandlers,
    ...veilarbpersonHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarbfilterHandlers,
    ...veilarbvedtaksstotteHandlers
];
