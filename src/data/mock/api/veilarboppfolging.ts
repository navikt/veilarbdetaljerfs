import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS, hentSimulerEndepunktResponsKonfigurasjon } from './index.ts';
import { OppfolgingData } from '../../api/datatyper/oppfolging.ts';
import { endepunkter } from '../../api/fetch.ts';
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
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(oppfolgingstatus, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(oppfolging, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    }),
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_STATUS, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const simulerEndepunktResponsKonfigurasjon = hentSimulerEndepunktResponsKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_STATUS
        );

        if (simulerEndepunktResponsKonfigurasjon !== null) {
            return simulerEndepunktResponsKonfigurasjon;
        }

        return HttpResponse.json(oppfolgingData, {
            headers: { [customResponseHeaders.NAV_CALL_ID]: crypto.randomUUID() }
        });
    })
];
