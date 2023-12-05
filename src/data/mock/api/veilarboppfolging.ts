import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { YtelseData } from '../../api/datatyper/ytelse';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';

const oppfolging: UnderOppfolgingData = {
    erManuell: true,
    underOppfolging: true
};

const oppfolgingstatus: OppfolgingsstatusData = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007'
    },
    veilederId: 'Z123456',
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
    hovedmaalkode: 'BEHOLDEA'
};

const ytelsestatus: YtelseData = {
    vedtaksliste: [
        {
            aktivitetsfase: 'Under arbeidsavklaring',
            fradato: {
                day: '19',
                month: '2',
                year: '2018'
            },
            status: 'Iverksatt',
            tildato: {
                day: '12',
                month: '10',
                year: '2018'
            },
            vedtakstype: 'Eksamensgebyr / Ny rettighet'
        },
        {
            aktivitetsfase: null,
            fradato: {
                day: '19',
                month: '2',
                year: '2018'
            },
            status: 'Iverksatt',
            tildato: null,
            vedtakstype: 'Arbeidsavklaringspenger / Endring'
        },
        {
            aktivitetsfase: 'Under arbeidsavklaring',
            fradato: {
                day: '19',
                month: '2',
                year: '2018'
            },
            status: 'Avsluttet',
            vedtakstype: 'Arbeidsavklaringspenger / Ny rettighet'
        }
    ]
};

export const veilarboppfolgingHandlers: RequestHandler[] = [
    http.post('/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolgingstatus);
    }),
    http.post('/veilarboppfolging/api/v2/person/hent-ytelser', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(ytelsestatus);
    }),
    http.post('/veilarboppfolging/api/v2/hent-underOppfolging', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolging);
    })
];
