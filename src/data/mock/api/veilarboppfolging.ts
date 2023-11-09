import { rest } from 'msw';
import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { YtelseData } from '../../api/datatyper/ytelse';
import { RequestHandler } from 'msw';

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
    rest.post('/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(oppfolgingstatus));
    }),
    rest.post('/veilarboppfolging/api/v2/person/hent-ytelser', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(ytelsestatus));
    }),
    rest.post('/veilarboppfolging/api/v2/hent-underOppfolging', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(oppfolging));
    })
];
