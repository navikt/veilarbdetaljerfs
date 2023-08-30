import { rest } from 'msw';
import { RequestHandler } from 'msw';
import { LiveStorage } from '@mswjs/storage';
import { overblikkVisningResponse } from '../../api/fetch';

const chips: overblikkVisningResponse = {
    overblikkVisning: ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser', 'Personalia']
};

const lagredeInformasjonsbokser = new LiveStorage<string[]>('lagredeInformasjonsbokser', chips.overblikkVisning);

export const veilarbfilterHandlers: RequestHandler[] = [
    rest.get('/veilarbfilter/api/overblikkvisning', (_, res, ctx) => {
        const data = lagredeInformasjonsbokser.getValue();
        return res(ctx.delay(500), ctx.json(data));
    }),

    rest.post('/veilarbfilter/api/overblikkvisning', (req, res, ctx) => {
        req.json().then((data) => {
            lagredeInformasjonsbokser.update(() => data);
        });
        return res(ctx.delay(500), ctx.status(204));
    })
];
