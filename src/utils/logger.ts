import { sendEventTilVeilarbperson } from '../data/api/fetch';
import { erLokalMode } from './miljo-utils';

export interface FrontendEvent {
    name: string;
    fields?: Record<string, unknown>;
    tags?: Record<string, unknown>;
}

export const logMetrikk = (
    metrikkNavn: string,
    fields?: Record<string, unknown>,
    tags?: Record<string, unknown>
): void => {
    if (erLokalMode()) {
        // oxlint-disable-next-line no-console
        console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
    } else {
        void sendEventTilVeilarbperson({ name: `${metrikkNavn}`, fields, tags });
    }
};
