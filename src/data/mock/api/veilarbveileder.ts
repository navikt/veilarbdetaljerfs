import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';
import { DEFAULT_DELAY_MILLISECONDS, hentEndepunktFeilSimuleringKonfigurasjon } from './index.ts';
import { endepunkter } from '../../api/fetch.ts';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get(`${endepunkter.VEILARBVEILEDER_VEILEDER}:veilederId`, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBVEILEDER_VEILEDER
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(veileder);
    })
];
