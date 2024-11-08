import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';
import { OppfolgingData } from '../../api/datatyper/oppfolging.ts';

const oppfolging: UnderOppfolgingData = {
    erManuell: true,
    underOppfolging: true
};

const oppfolgingstatus: OppfolgingsstatusData = {
    oppfolgingsenhet: {
        navn: 'Nav TestHeim',
        enhetId: '007'
    },
    veilederId: 'Z123456',
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
    hovedmaalkode: 'BEHOLDEA'
};

const oppfolgingData: OppfolgingData = {
    erIkkeArbeidssokerUtenOppfolging: true,
    fnr: '12345678910',
    harSkriveTilgang: true,
    kanStarteOppfolging: true,
    kanVarsles: false,
    manuell: false,
    oppfolgingsPerioder: [],
    reservasjonKRR: true,
    registrertKRR: true,
    underKvp: false,
    underOppfolging: true
};

export const veilarboppfolgingHandlers: RequestHandler[] = [
    http.post('/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolgingstatus);
    }),
    http.post('/veilarboppfolging/api/v2/hent-underOppfolging', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolging);
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/hent-status', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolgingData);
    })
];
