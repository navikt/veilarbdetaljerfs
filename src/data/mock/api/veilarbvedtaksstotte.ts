import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index';
import { Hovedmal, Innsatsgruppe } from '../../api/datatyper/siste14aVedtak';
import { Kodeverk14a } from '../../api/fetch.ts';

const kodeverkdata: Kodeverk14a = {
    innsatsgrupper: [
        {
            kode: 'STANDARD_INNSATS',
            beskrivelse: 'Gode muligheter',
            arenakode: 'IKVAL'
        },
        {
            kode: 'SITUASJONSBESTEMT_INNSATS',
            beskrivelse: 'Trenger veiledning',
            arenakode: 'BFORM'
        },
        {
            kode: 'SPESIELT_TILPASSET_INNSATS',
            beskrivelse: 'Trenger veiledning, nedsatt arbeidsevne',
            arenakode: 'BATT'
        },
        {
            kode: 'GRADERT_VARIG_TILPASSET_INNSATS',
            beskrivelse: 'Jobbe delvis',
            arenakode: 'VARIG'
        },
        {
            kode: 'VARIG_TILPASSET_INNSATS',
            beskrivelse: 'Liten mulighet til å jobbe',
            arenakode: 'VARIG'
        }
    ],
    hovedmal: [
        {
            kode: 'SKAFFE_ARBEID',
            beskrivelse: 'Skaffe arbeid'
        },
        {
            kode: 'BEHOLDE_ARBEID',
            beskrivelse: 'Beholde arbeid'
        }
    ]
};

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post('/veilarbvedtaksstotte/api/v2/hent-siste-14a-vedtak', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json({
            innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
            hovedmal: Hovedmal.BEHOLDE_ARBEID,
            fattetDato: new Date().toISOString(),
            fraArena: true
        });
    }),
    http.get('/open/api/kodeverk/innsatsgruppeoghovedmal', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json({ kodeverk: kodeverkdata });
    })
];
