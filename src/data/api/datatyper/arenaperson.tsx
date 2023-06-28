import { StringOrNothing } from '../../../utils/felles-typer';

type YearMonth = StringOrNothing; // er på formatet YYYY-MM
type YearMonthDay = StringOrNothing; // er på formatet YYYY-MM-DD

interface Utdanning {
    tittel?: string;
    utdanningsnivaa: string;
    studiested: StringOrNothing;
    beskrivelse: StringOrNothing;
    fraDato: YearMonth;
    tilDato: YearMonth;
}

interface Arbeidserfaring {
    tittel: StringOrNothing;
    arbeidsgiver: StringOrNothing;
    sted: StringOrNothing;
    beskrivelse: StringOrNothing;
    fraDato: YearMonth;
    tilDato: YearMonth;
}

interface AnnenErfaring {
    rolle: StringOrNothing;
    beskrivelse: StringOrNothing;
    fraDato: YearMonth;
    tilDato: YearMonth;
}

interface Forerkort {
    klasse: StringOrNothing;
}

interface Godkjenning {
    tittel: StringOrNothing;
    utsteder: StringOrNothing;
    gjennomfortDato: YearMonthDay;
    utloperDato: YearMonthDay;
}

type AnnenGodkjenning = Godkjenning;

export enum SprakNiva {
    IKKE_OPPGITT = 'IKKE_OPPGITT',
    NYBEGYNNER = 'NYBEGYNNER',
    GODT = 'GODT',
    VELDIG_GODT = 'VELDIG_GODT',
    FOERSTESPRAAK = 'FOERSTESPRAAK'
}

interface Sprak {
    sprak: StringOrNothing;
    muntligNiva: string | SprakNiva; // String er lagt til for bakoverkompatibilitet
    skriftligNiva: string | SprakNiva; // String er lagt til for bakoverkompatibilitet
}

interface Kurs {
    tittel: StringOrNothing;
    arrangor: StringOrNothing;
    tidspunkt?: YearMonthDay;
    varighet?: Kursvarighet;
}

export interface Kursvarighet {
    varighet: number;
    tidsenhet: KursVarighetEnhet;
}

export enum KursVarighetEnhet {
    TIME = 'TIME',
    DAG = 'DAG',
    UKE = 'UKE',
    MND = 'MND'
}

export interface Jobbprofil {
    sistEndret: StringOrNothing;
    onsketYrke: JobbprofilYrke[];
    onsketArbeidssted: JobbprofilArbeidssted[];
    onsketAnsettelsesform: JobbprofilAnsettelsesform[];
    onsketArbeidstidsordning: JobbprofilArbeidstidsordning[];
    onsketArbeidsskiftordning: JobbprofilArbeidsskiftordning[];
    onsketArbeidsdagordning: JobbprofilArbeidsdagordning[];
    heltidDeltid: JobbprofilHeltidDeltid;
    kompetanse?: JobbprofilKompetanse[];
    oppstart: JobbprofilOppstartstype;
}

interface JobbprofilYrke {
    tittel: string;
}

interface JobbprofilArbeidssted {
    stedsnavn: string;
}

interface JobbprofilAnsettelsesform {
    tittel: string;
}

interface JobbprofilArbeidstidsordning {
    tittel: string;
}

interface JobbprofilArbeidsdagordning {
    tittel: string;
}

interface JobbprofilArbeidsskiftordning {
    tittel: string;
}

interface JobbprofilHeltidDeltid {
    heltid: boolean;
    deltid: boolean;
}

export enum JobbprofilOppstartstype {
    LEDIG_NAA = 'LEDIG_NAA',
    ETTER_TRE_MND = 'ETTER_TRE_MND',
    ETTER_AVTALE = 'ETTER_AVTALE'
}

interface JobbprofilKompetanse {
    tittel: string;
}

export enum FagdokumentType {
    SVENNEBREV_FAGBREV = 'SVENNEBREV_FAGBREV',
    MESTERBREV = 'MESTERBREV',
    AUTORISASJON = 'AUTORISASJON'
}

export interface Fagdokumentasjon {
    tittel: string;
    type: FagdokumentType;
}

export interface ArenaPerson {
    sistEndret: StringOrNothing;
    sammendrag: StringOrNothing;
    arbeidserfaring: Arbeidserfaring[];
    utdanning: Utdanning[];
    annenErfaring: AnnenErfaring[];
    forerkort: Forerkort[];
    kurs: Kurs[];
    godkjenninger: Godkjenning[];
    andreGodkjenninger: AnnenGodkjenning[];
    sprak: Sprak[];
    jobbprofil?: Jobbprofil;
    fagdokumentasjoner?: Fagdokumentasjon[];
}
