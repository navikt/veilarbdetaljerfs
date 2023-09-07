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
export const trackAmplitude = (eventName: string, eventData?: Record<string, unknown> ) => {
	window.veilarbpersonflatefsAmplitude({origin:'verilarbdetaljerfs', eventName, eventData});
}
