import { StringOrNothing } from '../../../utils/felles-typer.ts';

export interface RepresentasjonFullmakt {
    fullmaktId: StringOrNothing;
    registrert: StringOrNothing;
    registrertAv: StringOrNothing;
    fullmaktsgiver: StringOrNothing;
    fullmektig: StringOrNothing;
    omraade: OmraadeMedHandling[] ;
    gyldigFraOgMed: string | null;
    gyldigTilOgMed: string | null;
    opplysningsId: StringOrNothing;
    endringsId: StringOrNothing;
    fullmaktsgiverNavn: StringOrNothing;
    fullmektigsNavn: StringOrNothing;
    opphoert: boolean;
    kilde: StringOrNothing;
    status: StringOrNothing;
    endretAv: StringOrNothing;
}

export interface OmraadeMedHandling {
    tema: StringOrNothing;
    handling: OmraadeHandlingType[];
}

export enum OmraadeHandlingType {
    LES = 'LES',
    KOMMUNISER = 'KOMMUNISER',
    SKRIV = 'SKRIV'
}