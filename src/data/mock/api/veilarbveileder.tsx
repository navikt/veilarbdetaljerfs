import { rest } from 'msw';
import { RequestHandler } from 'msw';
import { VeilederData } from '../../api/datatyper/veileder';

const veileder: VeilederData = {
    etternavn: 'Veiledersen',
    fornavn: 'TJ',
    ident: 'Z123456',
    navn: 'TJ Veiledersen'
};

export const veilarbveilederHandlers: RequestHandler[] = [
    rest.get('/veilarbveileder/api/veileder/:veilederId', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(veileder));
    })
];
