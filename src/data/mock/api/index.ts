import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarbfilterHandlers } from './veilarbfilter';
import { HttpResponse, RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbarenaHandlers } from './veilarbarena.ts';
import { Endepunkt } from '../../api/fetch.ts';
import { hentUtviklerInnstillinger } from '../../../components/utviklerinnstillinger/utviklerinnstillinger.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

export const DEFAULT_DELAY_MILLISECONDS: number = 100;

export const allHandlers: RequestHandler[] = [
    ...veilarbveilederHandlers,
    ...veilarbpersonHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarbfilterHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbarenaHandlers
];

export const hentSimulerEndepunktResponsKonfigurasjon = (endepunkt: Endepunkt) => {
    const simulerEndepunktResponsKonfigurasjon =
        hentUtviklerInnstillinger()?.innstillinger.simulerEndepunktRespons.endepunktKonfigurasjon[endepunkt];

    if (simulerEndepunktResponsKonfigurasjon?.overstyrRespons) {
        return new HttpResponse(null, {
            status: simulerEndepunktResponsKonfigurasjon.respons?.status ?? 500,
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    } else {
        return null;
    }
};
