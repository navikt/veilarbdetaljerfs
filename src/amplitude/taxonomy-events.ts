//Før du lager en ny eventType -> sjekk https://github.com/navikt/analytics-taxonomy/tree/main/events
export type AmplitudeEvent =
    | { name: 'navigere'; data: { lenketekst: string; destinasjon: string } }
    | { name: 'last ned'; data: { type: string; tema: string; tittel: string } }
    | { name: 'filtervalg'; data: { kategori: string; filternavn: string } }
    | { name: 'modal åpnet'; data: { tekst: string } };
