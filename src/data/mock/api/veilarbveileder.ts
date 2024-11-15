import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';
import { DEFAULT_DELAY_MILLISECONDS, fellesMockResponseHeaders } from './index.ts';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get('/veilarbveileder/api/veileder/:veilederId', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(veileder, { headers: { ...fellesMockResponseHeaders } });
    })
];
