import { sendEventTilVeilarbperson } from '../data/api/fetch';
import { erMock } from './miljo-utils';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
    if (erMock()) {
        // eslint-disable-next-line no-console
        console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
    } else {
        sendEventTilVeilarbperson({ name: `${metrikkNavn}`, fields, tags });
    }
};
