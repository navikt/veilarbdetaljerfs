import { rest } from 'msw';
import { RequestHandler } from 'msw';

const chips: string[] = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];

export const veilarbfilterHandlers: RequestHandler[] = [
    rest.get('/veilarbfilter/api/overblikkvisning', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(chips));
    })
];
