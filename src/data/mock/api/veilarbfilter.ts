import { rest } from 'msw';
import { RequestHandler } from 'msw';
import { LiveStorage } from '@mswjs/storage';

const chips: string[] = ['CV', 'Jobbønsker', 'Oppfølging', 'Personalia', 'Registrering', 'Ytelser'];

const lagredeInformasjonsbokser = new LiveStorage<string[]>('lagredeInformasjonsbokser', chips);

export const veilarbfilterHandlers: RequestHandler[] = [
    rest.get('/veilarbfilter/api/overblikkvisning', (_, res, ctx) => {
        const data = lagredeInformasjonsbokser.getValue();
        return res(ctx.delay(500), ctx.json(data));
    }),

    rest.post('/veilarbfilter/api/overblikkvisning', (req, res, ctx) => {
        req.json().then((data) => {
            console.log('DATA post:', data);
            lagredeInformasjonsbokser.update(() => data);
        });
        return res(ctx.delay(500), ctx.status(204));
    })
];
