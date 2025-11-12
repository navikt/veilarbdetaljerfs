//Før du lager en ny eventType -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export type AmplitudeEvent =
    | { name: 'knapp klikket'; data: { knapptekst: string } };
