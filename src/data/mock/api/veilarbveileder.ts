import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { endepunkter, overblikkVisningResponse } from '../../api/fetch.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';
import { LiveStorage } from '@mswjs/storage';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

const chips: overblikkVisningResponse = {
    overblikkVisning: ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser (Arena)', 'Personalia']
};

const lagredeInformasjonsbokser = new LiveStorage<string[]>('lagredeInformasjonsbokser', chips.overblikkVisning);

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get(`${endepunkter.VEILARBVEILEDER_VEILEDER}:veilederId`, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_VEILEDER
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(veileder, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    http.get(endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING, async () => {
        const data = lagredeInformasjonsbokser.getValue();
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(data, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),

    http.post(endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING, async ({ request }) => {
        const requestBody = (await request.json()) as string[];
        lagredeInformasjonsbokser.update(() => requestBody);
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBVEILEDER_OVERBLIKKVISNING
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
