import { OboFeatureToggles, VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE } from '../../api/fetch';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';

const mockFeatures: OboFeatureToggles = {
    [VIS_INNSATSGRUPPE_HOVEDMAL_FRA_VEILARBVEDTAKSSTOTTE]: false
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(mockFeatures);
    })
];
