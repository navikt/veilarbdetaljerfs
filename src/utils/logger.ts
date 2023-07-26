import { sendEventTilVeilarbperson } from '../data/api/fetch';
import { erMock } from './miljo-utils';

export interface FrontendEvent {
    name: string;
    fields?: object;
    tags?: object;
}

export const logMetrikk = (metrikkNavn: string, fields?: object, tags?: object): void => {
    if (erMock()) {
        console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
    } else {
        sendEventTilVeilarbperson({ name: `${metrikkNavn}`, fields, tags });
    }
};
