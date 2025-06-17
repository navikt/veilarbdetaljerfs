import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { YtelseData } from '../../api/datatyper/ytelse.ts';
import { endepunkter } from '../../api/fetch.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

const ytelsestatus: YtelseData = {
    vedtak: [
        {
            aktivitetsfase: 'Under arbeidsavklaring',
            fraDato: '2018-02-19',
            status: 'Iverksatt',
            tilDato: '2018-10-12',
            type: 'Eksamensgebyr / Ny rettighet'
        },
        {
            aktivitetsfase: null,
            fraDato: '2018-02-19',
            status: 'Iverksatt',
            tilDato: null,
            type: 'Arbeidsavklaringspenger / Endring'
        },
        {
            aktivitetsfase: 'Under arbeidsavklaring',
            fraDato: '2018-02-19',
            status: 'Avsluttet',
            type: 'Arbeidsavklaringspenger / Ny rettighet'
        }
    ]
};
export const veilarbarenaHandlers: RequestHandler[] = [
    http.post(endepunkter.VEILARBARENA_HENT_YTELSER, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBARENA_HENT_YTELSER
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(ytelsestatus, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
