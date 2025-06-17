import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { endepunkter } from '../../api/fetch.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

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
    })
];
