import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS, hentEndepunktFeilSimuleringKonfigurasjon } from './index';
import {
    ArenaKode,
    GammelInnsatsgruppe,
    Hovedmal,
    Innsatsgruppe,
    Kodeverk14a
} from '../../api/datatyper/kodeverk14aData.ts';
import { endepunkter } from '../../api/fetch.ts';

const kodeverkdata: Kodeverk14a = {
    innsatsgrupper: [
        {
            kode: Innsatsgruppe.GODE_MULIGHETER,
            beskrivelse: 'Gode muligheter',
            gammelKode: GammelInnsatsgruppe.STANDARD_INNSATS,
            arenakode: ArenaKode.IKVAL
        },
        {
            kode: Innsatsgruppe.TRENGER_VEILEDNING,
            beskrivelse: 'Trenger veiledning',
            gammelKode: GammelInnsatsgruppe.SITUASJONSBESTEMT_INNSATS,
            arenakode: ArenaKode.BFORM
        },
        {
            kode: Innsatsgruppe.TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE,
            beskrivelse: 'Trenger veiledning, nedsatt arbeidsevne',
            gammelKode: GammelInnsatsgruppe.SPESIELT_TILPASSET_INNSATS,
            arenakode: ArenaKode.BATT
        },
        {
            kode: Innsatsgruppe.JOBBE_DELVIS,
            beskrivelse: 'Jobbe delvis',
            gammelKode: GammelInnsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS,
            arenakode: ArenaKode.VARIG
        },
        {
            kode: Innsatsgruppe.LITEN_MULIGHET_TIL_A_JOBBE,
            beskrivelse: 'Liten mulighet til å jobbe',
            gammelKode: GammelInnsatsgruppe.VARIG_TILPASSET_INNSATS,
            arenakode: ArenaKode.VARIG
        }
    ],
    hovedmal: [
        {
            kode: Hovedmal.SKAFFE_ARBEID,
            beskrivelse: 'Skaffe arbeid'
        },
        {
            kode: Hovedmal.BEHOLDE_ARBEID,
            beskrivelse: 'Beholde arbeid'
        }
    ]
};

const gjeldende14aVekdak = {
    innsatsgruppe: 'LITEN_MULIGHET_TIL_A_JOBBE',
    hovedmal: 'SKAFFE_ARBEID',
    fattetDato: '2021-01-01'
};

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post(endepunkter.VEILARBVEDTAKSSTOTTE_HENT_GJELDENDE_14A_VEDTAK, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBVEDTAKSSTOTTE_HENT_GJELDENDE_14A_VEDTAK
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(gjeldende14aVekdak);
    }),
    http.get(endepunkter.VEILARBVEDTAKSSTOTTE_INNSATSGRUPPEOGHOVEDMAL, async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);

        const endepunktSimulerFeilKonfigurasjon = hentEndepunktFeilSimuleringKonfigurasjon(
            endepunkter.VEILARBVEDTAKSSTOTTE_INNSATSGRUPPEOGHOVEDMAL
        );

        if (endepunktSimulerFeilKonfigurasjon !== null) {
            return endepunktSimulerFeilKonfigurasjon;
        }

        return HttpResponse.json(kodeverkdata);
    })
];
