import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index';
import { ArenaKode, Hovedmal, Innsatsgruppe, Kodeverk14a } from '../../api/datatyper/kodeverk14aData.ts';

const kodeverkdata: Kodeverk14a = {
    innsatsgrupper: [
        {
            kode: Innsatsgruppe.STANDARD_INNSATS,
            beskrivelse: 'Gode muligheter',
            arenakode: ArenaKode.IKVAL
        },
        {
            kode: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
            beskrivelse: 'Trenger veiledning',
            arenakode: ArenaKode.BFORM
        },
        {
            kode: Innsatsgruppe.SPESIELT_TILPASSET_INNSATS,
            beskrivelse: 'Trenger veiledning, nedsatt arbeidsevne',
            arenakode: ArenaKode.BATT
        },
        {
            kode: Innsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS,
            beskrivelse: 'Jobbe delvis',
            arenakode: ArenaKode.VARIG
        },
        {
            kode: Innsatsgruppe.VARIG_TILPASSET_INNSATS,
            beskrivelse: 'Liten mulighet til å jobbe',
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

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post('/veilarbvedtaksstotte/api/v2/hent-siste-14a-vedtak', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json({
            innsatsgruppe: Innsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS,
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
