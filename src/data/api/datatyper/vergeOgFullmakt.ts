import { StringOrNothing } from '../../../utils/felles-typer';

export enum Vergetype {
    VOKSEN = 'VOKSEN',
    MINDREAARIG = 'MINDREAARIG',
    MIDLERTIDIG_FOR_VOKSEN = 'MIDLERTIDIG_FOR_VOKSEN',
    MIDLERTIDIG_FOR_MINDREAARIG = 'MIDLERTIDIG_FOR_MINDREAARIG',
    STADFESTET_FREMTIDSFULLMAKT = 'STADFESTET_FREMTIDSFULLMAKT',
    ENSLIG_MINDREAARIG_ASYLSOEKER = 'ENSLIG_MINDREAARIG_ASYLSOEKER',
    ENSLIG_MINDREAARIG_FLYKTNING = 'ENSLIG_MINDREAARIG_FLYKTNING',
    FORVALTNING_UTENFOR_VERGEMAAL = 'FORVALTNING_UTENFOR_VERGEMAAL'
}

export enum VergemaalEllerFullmaktOmfangType {
    UTLENDINGSSAKER = 'UTLENDINGSSAKER',
    PERSONLIGE_INTERESSER = 'PERSONLIGE_INTERESSER',
    OEKONOMISKE_INTERESSER = 'OEKONOMISKE_INTERESSER',
    PERSONLIGE_OG_OEKONOMISKE_INTERESSER = 'PERSONLIGE_OG_OEKONOMISKE_INTERESSER'
}

export interface Navn {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
    forkortetNavn: string;
}

export interface VergeNavn {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
}

export interface VergeEllerFullmektig {
    navn: VergeNavn | null;
    motpartsPersonident: StringOrNothing;
    omfang: VergemaalEllerFullmaktOmfangType;
}

export interface Folkeregistermetadata {
    ajourholdstidspunkt: StringOrNothing;
    gyldighetstidspunkt: StringOrNothing;
}

export interface VergemaalEllerFremtidsfullmakt {
    type: Vergetype;
    embete: StringOrNothing;
    vergeEllerFullmektig: VergeEllerFullmektig;
    folkeregistermetadata: Folkeregistermetadata;
}

export interface Omraade {
    kode: string;
    beskrivelse: string;
}

export interface Fullmakt {
    motpartsPersonident: StringOrNothing;
    motpartsPersonNavn: Navn;
    motpartsRolle: StringOrNothing;
    omraader: Omraade[];
    gyldigFraOgMed: StringOrNothing;
    gyldigTilOgMed: StringOrNothing;
}

export interface VergeOgFullmaktData {
    vergemaalEllerFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[];
    fullmakter: Fullmakt[];
}
