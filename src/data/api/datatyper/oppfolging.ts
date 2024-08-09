export interface OppfolgingData {
    erIkkeArbeidssokerUtenOppfolging: boolean;
    erSykmeldtMedArbeidsgiver?: boolean;
    fnr: string;
    harSkriveTilgang: boolean;
    inaktivIArena?: boolean;
    inaktiveringsdato?: string;
    kanReaktiveres?: boolean;
    kanStarteOppfolging: boolean;
    kanVarsles: boolean;
    manuell: boolean;
    oppfolgingUtgang?: string;
    oppfolgingsPerioder: OppfolgingsPerioder[];
    reservasjonKRR: boolean;
    registrertKRR: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    veilederId?: string;
}

interface OppfolgingsPerioder {
    aktorId: string;
    veileder?: string;
    startDato: string;
    sluttDato?: string;
    begrunnelse: string;
    kvpPerioder: KvpPerioder[];
}

interface KvpPerioder {
    opprettetDato: Date;
    avsluttetDato?: Date;
}
