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

export interface VergeNavn {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
}

export interface VergeEllerFullmektig {
    navn: VergeNavn | null;
    motpartsPersonident: StringOrNothing;
    tjenesteomraade: Tjenesteomraade[];
}

export interface Tjenesteomraade {
    tjenesteoppgave: string;
    tjenestevirksomhet: string;
}

export interface Folkeregistermetadata {
    ajourholdstidspunkt: StringOrNothing;
    gyldighetstidspunkt: StringOrNothing;
    opphoerstidspunkt: StringOrNothing;
}

export interface VergemaalEllerFremtidsfullmakt {
    type: Vergetype;
    embete: StringOrNothing;
    vergeEllerFullmektig: VergeEllerFullmektig;
    folkeregistermetadata: Folkeregistermetadata;
}

export interface Vergemal {
    vergemaalEllerFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[];
}
