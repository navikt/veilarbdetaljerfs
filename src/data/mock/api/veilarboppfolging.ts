import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';
import { OppfolgingData } from '../../api/datatyper/oppfolging.ts';
import { customResponseHeaders } from '../../api/datatyper/apiOptions.ts';

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
    hovedmaalkode: 'OKEDELT'
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
        return HttpResponse.json(oppfolgingstatus, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    http.post('/veilarboppfolging/api/v2/hent-underOppfolging', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolging, { headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() } });
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/hent-status', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(oppfolgingData, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
