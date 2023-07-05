import { rest } from 'msw';
import { RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'Iskrem',
    ident: 'Z123999',
    navn: 'Iskrem Veiledersen'
};

export const veilarbveilederHandlers: RequestHandler[] = [
    rest.get('/veilarbveileder/api/veileder/:veilederId', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(veileder), ctx.status(301));
    })
];
