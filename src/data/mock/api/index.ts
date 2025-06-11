import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarbfilterHandlers } from './veilarbfilter';
import { HttpResponse, RequestHandler } from 'msw';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbarenaHandlers } from './veilarbarena.ts';
import { Endepunkt } from '../../api/fetch.ts';
import { hentUtviklerInnstillinger } from '../../../components/utviklerinnstillinger/utviklerinnstillinger.ts';

export const DEFAULT_DELAY_MILLISECONDS: number = 100;

export const allHandlers: RequestHandler[] = [
    ...veilarbveilederHandlers,
    ...veilarbpersonHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarbfilterHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbarenaHandlers
];

export const hentEndepunktFeilSimuleringKonfigurasjon = (endepunkt: Endepunkt) => {
    const endepunktSimulerFeilKonfigurasjon =
        hentUtviklerInnstillinger()?.innstillinger.simulerEndepunktFeil.endepunktKonfigurasjon[endepunkt];

    if (endepunktSimulerFeilKonfigurasjon?.simulerFeil) {
        return new HttpResponse(null, {
            status: endepunktSimulerFeilKonfigurasjon.statuskode ?? 500
        });
    } else {
        return null;
    }
};
