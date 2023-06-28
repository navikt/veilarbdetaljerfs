import { OrNothing, StringOrNothing } from '../../../utils/felles-typer';

export interface OppfolgingEnhet {
    navn: StringOrNothing;
    enhetId: StringOrNothing;
}
export type ArenaFormidlingsgruppeKode = 'ARBS' | 'IARBS' | 'ISERV' | 'PARBS' | 'RARBS';
export type ArenaServicegruppeKode =
    | 'BATT'
    | 'BFORM'
    | 'BKART'
    | 'IKVAL'
    | 'IVURD'
    | 'KAP11'
    | 'OPPFI'
    | 'VARIG'
    | 'VURDI'
    | 'VURDU';
export type ArenaHovedmalKode = 'OKEDELT' | 'SKAFFEA' | 'BEHOLDEA';

export interface OppfolgingsstatusData {
    oppfolgingsenhet: OppfolgingEnhet;
    veilederId: StringOrNothing;
    formidlingsgruppe: OrNothing<ArenaFormidlingsgruppeKode>;
    servicegruppe: OrNothing<ArenaServicegruppeKode>;
    hovedmaalkode: OrNothing<ArenaHovedmalKode>;
}
