import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarbfilterHandlers } from './veilarbfilter';
import { RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbpersonflatefsHandlers } from './veilarbpersonflatefs.ts';
import { veilarbarenaHandlers } from './veilarbarena.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

export const DEFAULT_DELAY_MILLISECONDS: number = 100;
export const fellesMockResponseHeaders: HeadersInit = {
    [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID()
};

export const allHandlers: RequestHandler[] = [
    ...veilarbveilederHandlers,
    ...veilarbpersonHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarbfilterHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbpersonflatefsHandlers,
    ...veilarbarenaHandlers
];
