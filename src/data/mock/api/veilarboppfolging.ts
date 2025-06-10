import { UnderOppfolgingData } from '../../api/datatyper/underOppfolgingData';
import { OppfolgingsstatusData } from '../../api/datatyper/oppfolgingsstatus';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS, hentEndepunktFeilSimuleringKonfigurasjon } from './index.ts';
import { OppfolgingData } from '../../api/datatyper/oppfolging.ts';
import { endepunkter } from '../../api/fetch.ts';

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

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_OPPFOLGINGSSTATUS
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(oppfolgingstatus);
    }),
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_UNDER_OPPFOLGING
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(oppfolging);
    }),
    http.post(endepunkter.VEILARBOPPFOLGING_HENT_STATUS, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBOPPFOLGING_HENT_STATUS
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(oppfolgingData);
    })
];
