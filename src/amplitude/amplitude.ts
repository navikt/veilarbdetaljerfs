import { AmplitudeEvent } from './taxonomy-events';

declare global {
    /* tslint:disable:no-unused-variable */
    interface Window {
        veilarbpersonflatefsAmplitude: ({
            origin,
            eventName,
            eventData
        }?: {
            origin: string;
            eventName: string;
            eventData?: Record<string, unknown>;
        }) => Promise<void>;
    }
    /* tslint:enable:no-unused-variable */
}
export const trackAmplitude = (
    { name: eventName, data: eventData }: AmplitudeEvent,
    ekstraData?: Record<string, unknown>
) => {
    if (window?.veilarbpersonflatefsAmplitude) {
        window.veilarbpersonflatefsAmplitude({
            origin: 'verilarbdetaljerfs',
            eventName,
            eventData: { ...eventData, ...ekstraData }
        });
    }
};
