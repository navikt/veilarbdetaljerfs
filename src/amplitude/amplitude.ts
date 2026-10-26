// TODO migrer til Umami
// declare global {
//     /* tslint:disable:no-unused-variable */
//     interface Window {
//         veilarbpersonflatefsAmplitude: ({
//             origin,
//             eventName,
//             eventData
//         }?: {
//             origin: string;
//             eventName: string;
//             eventData?: Record<string, unknown>;
//         }) => Promise<void>;
//     }
//     /* tslint:enable:no-unused-variable */
// }

export const maskereFodselsnummer = (data?: Record<string, unknown>) => {
    const maskertObjekt = JSON.stringify(data).replace(/\d{11}/g, (_, indexOfMatch, fullString) =>
        fullString.charAt(indexOfMatch - 1) === '"' ? '***********' : '"***********"'
    );

    try {
        return JSON.parse(maskertObjekt);
    } catch {
        // oxlint-disable-next-line no-console
        console.error('Kunne ikke maskere data korrekt før sending til Umami.');
    }
    return {};
};

// TODO migrer til Umami
// export const trackAmplitude = (
//     { name: eventName, data: eventData }: AmplitudeEvent,
//     ekstraData?: Record<string, unknown>
// ) => {
//     if (window?.veilarbpersonflatefsAmplitude) {
//         window.veilarbpersonflatefsAmplitude({
//             origin: 'verilarbdetaljerfs',
//             eventName,
//             eventData: maskereFodselsnummer({ ...eventData, ...ekstraData })
//         });
//     }
// };
