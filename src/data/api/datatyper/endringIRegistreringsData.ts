interface Utdanning {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface UtdanningBestatt {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface UtdanningGodkjent {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface HelseHinder {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface AndreForhold {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface SisteStilling {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface DinSituasjonTilleggsdata {
    forsteArbeidsdagDato: string | null;
    sisteArbeidsdagDato: string | null;
    oppsigelseDato: string | null;
    gjelderFraDato: string | null;
    permitteringsProsent: string | null;
    stillingsProsent: string | null;
    permitteringForlenget: string | null;
    harNyJobb: string | null;
}
interface DinSituasjon {
    verdi: string | null;
    tilleggsData: DinSituasjonTilleggsdata | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}
interface FremtidigSituasjon {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

interface TilbakeIArbeid {
    verdi: string | null;
    gjelderFraDato: string | null;
    gjelderTilDato: string | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
}

export interface Besvarelse {
    utdanning: Utdanning;
    utdanningBestatt: UtdanningBestatt;
    utdanningGodkjent: UtdanningGodkjent;
    helseHinder: HelseHinder;
    andreForhold: AndreForhold;
    sisteStilling: SisteStilling;
    dinSituasjon: DinSituasjon;
    fremtidigSituasjon: FremtidigSituasjon;
    tilbakeIArbeid: TilbakeIArbeid;
}

export interface EndringIRegistreringsdata {
    registreringsId: number | null;
    besvarelse: Besvarelse | null;
    endretAv: string | null;
    endretTidspunkt: string | null;
    registreringsTidspunkt: string | null;
    opprettetAv: string | null;
    erBesvarelsenEndret: boolean | null;
}
