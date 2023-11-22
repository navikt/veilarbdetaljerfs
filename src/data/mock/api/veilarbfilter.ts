import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { LiveStorage } from '@mswjs/storage';
import { overblikkVisningResponse } from '../../api/fetch';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';

const chips: overblikkVisningResponse = {
    overblikkVisning: ['CV', 'Jobbønsker', 'Registrering', 'Oppfølging', 'Ytelser', 'Personalia']
};

const lagredeInformasjonsbokser = new LiveStorage<string[]>('lagredeInformasjonsbokser', chips.overblikkVisning);

export const veilarbfilterHandlers: RequestHandler[] = [
    http.get('/veilarbfilter/api/overblikkvisning', async () => {
        const data = lagredeInformasjonsbokser.getValue();
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(data);
    }),

    http.post('/veilarbfilter/api/overblikkvisning', async ({ request }) => {
        const requestBody = (await request.json()) as string[];
        lagredeInformasjonsbokser.update(() => requestBody);
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return new HttpResponse(null, { status: 204 });
    })
];
