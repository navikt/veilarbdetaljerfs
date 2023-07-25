import { RequestHandler } from 'msw';
import { rest } from 'msw';
import { Hovedmal, Innsatsgruppe, Siste14aVedtak } from '../../api/datatyper/siste14aVedtak';

const siste14aVedtak: Siste14aVedtak = {
    innsatsgruppe: Innsatsgruppe.STANDARD_INNSATS,
    hovedmal: Hovedmal.BEHOLDE_ARBEID
};

const tilhorerBrukerUtrulletKontor = false;

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    rest.get('/veilarbvedtaksstotte/api/siste-14a-vedtak', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(siste14aVedtak));
    }),

    rest.get('/veilarbvedtaksstotte/api/utrulling/tilhorerBrukerUtrulletKontor', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(tilhorerBrukerUtrulletKontor));
    })
];
