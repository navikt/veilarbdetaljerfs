import { OrNothing, StringOrNothing } from '../../../utils/felles-typer';

export enum Gradering {
    UKJENT = 'UKJENT',
    UGRADERT = 'UGRADERT',
    FORTROLIG = 'FORTROLIG',
    STRENGT_FORTROLIG = 'STRENGT_FORTROLIG',
    STRENGT_FORTROLIG_UTLAND = 'STRENGT_FORTROLIG_UTLAND'
}

export enum RelasjonsBosted {
    SAMME_BOSTED = 'SAMME_BOSTED',
    ANNET_BOSTED = 'ANNET_BOSTED',
    UKJENT_BOSTED = 'UKJENT_BOSTED'
}

export enum SivilstandType {
    UOPPGITT = 'UOPPGITT',
    UGIFT = 'UGIFT',
    GIFT = 'GIFT',
    SEPARERT = 'SEPARERT',
    SKILT = 'SKILT',
    ENKE_ELLER_ENKEMANN = 'ENKE_ELLER_ENKEMANN',
    REGISTRERT_PARTNER = 'REGISTRERT_PARTNER',
    SEPARERT_PARTNER = 'SEPARERT_PARTNER',
    SKILT_PARTNER = 'SKILT_PARTNER',
    GJENLEVENDE_PARTNER = 'GJENLEVENDE_PARTNER'
}

export interface GrunnPersonalia {
    fornavn: StringOrNothing;
    fodselsnummer: string;
    fodselsdato: string;
    dodsdato: StringOrNothing;
    kjonn: StringOrNothing;
}

export interface PersonsBarn {
    fornavn: StringOrNothing;
    fodselsdato: string;
    erEgenAnsatt: boolean;
    dodsdato: StringOrNothing;
    relasjonsBosted: RelasjonsBosted | null;
    gradering: Gradering;
    harVeilederTilgang: boolean;
}

export interface Enhet {
    enhetsnummer: string;
    navn: string;
}

export interface PersonaliaPartner {
    gradering: Gradering;
    erEgenAnsatt: boolean;
    harSammeBosted: boolean;
    harVeilederTilgang: boolean;
}

export interface PersonaliaSivilstandNy {
    sivilstand: SivilstandType;
    fraDato: StringOrNothing;
    skjermet: boolean | null;
    gradering: Gradering;
    relasjonsBosted: RelasjonsBosted | null;
    master: StringOrNothing;
    registrertDato: StringOrNothing;
}

export interface PersonaliaTelefon {
    prioritet: string;
    telefonNr: string;
    registrertDato: StringOrNothing;
    master: string;
}

export interface PersonaliaEpost {
    epostAdresse: StringOrNothing;
    epostSistOppdatert: StringOrNothing;
    master: StringOrNothing;
}

export interface Vegadresse {
    matrikkelId: OrNothing<number>;
    postnummer: StringOrNothing;
    husnummer: StringOrNothing;
    husbokstav: StringOrNothing;
    kommunenummer: StringOrNothing;
    kommune: StringOrNothing;
    adressenavn: StringOrNothing;
    tilleggsnavn: StringOrNothing;
    poststed: StringOrNothing;
}

export interface Matrikkeladresse {
    matrikkelId: OrNothing<number>;
    bruksenhetsnummer: StringOrNothing;
    tilleggsnavn: StringOrNothing;
    postnummer: StringOrNothing;
    kommunenummer: StringOrNothing;
    kommune: StringOrNothing;
    poststed: StringOrNothing;
}

export interface Utenlandskadresse {
    adressenavnNummer: StringOrNothing;
    bygningEtasjeLeilighet: StringOrNothing;
    postboksNummerNavn: StringOrNothing;
    postkode: StringOrNothing;
    bySted: StringOrNothing;
    regionDistriktOmraade: StringOrNothing;
    landkode: StringOrNothing;
}

export interface Ukjentbosted {
    bostedskommune: StringOrNothing;
    kommune: StringOrNothing;
}

export interface Postboksadresse {
    postbokseier: StringOrNothing;
    postboks: StringOrNothing;
    postnummer: StringOrNothing;
    poststed: StringOrNothing;
}

export interface PostadresseIFrittFormat {
    adresselinje1: StringOrNothing;
    adresselinje2: StringOrNothing;
    adresselinje3: StringOrNothing;
    postnummer: StringOrNothing;
    poststed: StringOrNothing;
}

export interface UtenlandskadresseIFrittFormat {
    adresselinje1: StringOrNothing;
    adresselinje2: StringOrNothing;
    adresselinje3: StringOrNothing;
    byEllerStedsnavn: StringOrNothing;
    postkode: StringOrNothing;
    landkode: StringOrNothing;
}

export interface Bostedsadresse {
    coAdressenavn: StringOrNothing;
    vegadresse: OrNothing<Vegadresse>;
    matrikkeladresse: OrNothing<Matrikkeladresse>;
    utenlandskAdresse: OrNothing<Utenlandskadresse>;
    ukjentBosted: OrNothing<Ukjentbosted>;
}

export interface Oppholdsadresse {
    coAdressenavn: StringOrNothing;
    vegadresse: OrNothing<Vegadresse>;
    matrikkeladresse: OrNothing<Matrikkeladresse>;
    utenlandskAdresse: OrNothing<Utenlandskadresse>;
}

export interface Kontaktadresse {
    type: string;
    coAdressenavn: StringOrNothing;
    vegadresse: OrNothing<Vegadresse>;
    postboksadresse: OrNothing<Postboksadresse>;
    utenlandskAdresse: OrNothing<Utenlandskadresse>;
    postadresseIFrittFormat: OrNothing<PostadresseIFrittFormat>;
    utenlandskAdresseIFrittFormat: OrNothing<UtenlandskadresseIFrittFormat>;
}

export interface PersonaliaInfo extends GrunnPersonalia {
    barn: PersonsBarn[];
    geografiskEnhet: OrNothing<Enhet>;
    telefon: PersonaliaTelefon[];
    epost: OrNothing<PersonaliaEpost>;
    statsborgerskap: string[];
    partner?: PersonaliaPartner;
    sivilstandliste?: PersonaliaSivilstandNy[];
    bostedsadresse: OrNothing<Bostedsadresse>;
    oppholdsadresse: OrNothing<Oppholdsadresse>;
    kontaktadresser: Kontaktadresse[];
    malform: StringOrNothing;
}
