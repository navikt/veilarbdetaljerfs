import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';
import { YtelseData } from '../../api/datatyper/ytelse.ts';
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
    http.post('/veilarbarena/api/v2/arena/hent-ytelser', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(ytelsestatus, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
