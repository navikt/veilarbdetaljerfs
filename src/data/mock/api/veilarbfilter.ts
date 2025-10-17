import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { LiveStorage } from '@mswjs/storage';
import { endepunkter, overblikkVisningResponse } from '../../api/fetch';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

const chips: overblikkVisningResponse = {
    overblikkVisning: ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser (Arena)', 'Personalia']
};

const lagredeInformasjonsbokser = new LiveStorage<string[]>('lagredeInformasjonsbokser', chips.overblikkVisning);

export const veilarbfilterHandlers: RequestHandler[] = [
    http.get(endepunkter.VEILARBFILTER_OVERBLIKKVISNING, async () => {
        const data = lagredeInformasjonsbokser.getValue();
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBFILTER_OVERBLIKKVISNING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(data, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),

    http.post(endepunkter.VEILARBFILTER_OVERBLIKKVISNING, async ({ request }) => {
        const requestBody = (await request.json()) as string[];
        lagredeInformasjonsbokser.update(() => requestBody);
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBFILTER_OVERBLIKKVISNING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return new HttpResponse(null, {
            status: 204,
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
