import { StringOrNothing } from '../../../utils/felles-typer.ts';

export interface FullmaktData {
    fullmakt: Fullmakt[];
}

export interface Fullmakt {
    fullmaktsgiver: StringOrNothing;
    fullmektig: StringOrNothing;
    omraade: OmraadeMedHandling[];
    gyldigFraOgMed: StringOrNothing;
    gyldigTilOgMed: StringOrNothing;
    fullmaktsgiverNavn: StringOrNothing;
    fullmektigsNavn: StringOrNothing;
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
