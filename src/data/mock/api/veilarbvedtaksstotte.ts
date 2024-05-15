import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';
import { Hovedmal, Innsatsgruppe } from '../../api/datatyper/siste14aVedtak.ts';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post('/veilarbvedtaksstotte/api/v2/hent-siste-14a-vedtak', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json({
            innsatsgruppe: Innsatsgruppe.SITUASJONSBESTEMT_INNSATS,
            hovedmal: Hovedmal.BEHOLDE_ARBEID,
            fattetDato: new Date().toISOString(),
            fraArena: true
        });
    })
];
