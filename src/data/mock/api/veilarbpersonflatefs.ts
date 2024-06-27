import {
    OboUnleashFeatures,
    BRUK_NY_KILDE_TIL_FULLMAKT
} from '../../api/fetch';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';

const mockFeatures: OboUnleashFeatures = {
    [BRUK_NY_KILDE_TIL_FULLMAKT]: true
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(mockFeatures);
    }),
];
