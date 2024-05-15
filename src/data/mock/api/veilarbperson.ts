import { delay, http, HttpResponse, RequestHandler } from 'msw';
import {
    ArenaPerson,
    FagdokumentType,
    JobbprofilOppstartstype,
    KursVarighetEnhet,
    SprakNiva
} from '../../api/datatyper/arenaperson';
import { AktorId } from '../../api/datatyper/aktor-id';
import { Gradering, PersonaliaInfo, RelasjonsBosted } from '../../api/datatyper/personalia';
import { VergemaalEllerFullmaktOmfangType, VergeOgFullmaktData, Vergetype } from '../../api/datatyper/vergeOgFullmakt';
import { TilrettelagtKommunikasjonData } from '../../api/datatyper/tilrettelagtKommunikasjon';
import { RegistreringsData } from '../../api/datatyper/registreringsData';
import { EndringIRegistreringsdata } from '../../api/datatyper/endringIRegistreringsData';
import { DEFAULT_DELAY_MILLISECONDS } from './index.ts';

const aktorId: AktorId = {
    aktorId: '1234567'
};

const cvOgJobbonsker: ArenaPerson = {
    sistEndret: '2019-01-15T07:52:35.456+01:00',
    sammendrag:
        'Jeg er en maritime executive som har mastergrad og bachlorgrad. Har vært teknisk direktor i mange år og flyttet hjem til Norge hvor jeg søker arbeide innenfor then maritime sektor. Har gode referanser og variert seiling og onshore basert arbeid.',
    arbeidserfaring: [
        {
            tittel: 'Maskinsjef',
            arbeidsgiver: 'viola enviromental',
            sted: 'Langtvekkistan',
            beskrivelse: 'Beskrivelse av arbeidserfaring',
            fraDato: '2010-04',
            tilDato: '2017-06'
        },
        {
            tittel: 'Arbeidskar',
            arbeidsgiver: 'Lokale arbeidskarforening',
            sted: 'Oppdal',
            beskrivelse: 'Krever en kar å drive med arbeid',
            fraDato: '2017-08',
            tilDato: null
        }
    ],
    fagdokumentasjoner: [
        {
            tittel: 'Mesterbrev baker',
            type: FagdokumentType.MESTERBREV
        },
        {
            tittel: 'Yrkeskompetanse helsesekretær',
            type: FagdokumentType.SVENNEBREV_FAGBREV
        }
    ],
    utdanning: [
        {
            tittel: 'Andre servicefag, andre, uspesifisert utdanningsgruppe, høyere nivå',
            utdanningsnivaa: 'Doktorgrad',
            studiested: 'Pasific University',
            beskrivelse: 'Beskrivelse av utdanning',
            fraDato: '1999-06',
            tilDato: null
        },
        {
            tittel: 'Cand.scient.-utdanning, mekanikk',
            utdanningsnivaa: 'Høyere utdanning, 1-4 år',
            studiested: 'Pasific university, kjempelangt studiested',
            beskrivelse: null,
            fraDato: '1999-06',
            tilDato: '2003-06'
        },
        {
            tittel: 'Teknisk fagskole, linje for maritime fag og fiskerifag, toårig',
            utdanningsnivaa: 'Folkehøgskole',
            studiested: 'arendal maritime hoyskole',
            beskrivelse: null,
            fraDato: '1989-06',
            tilDato: '1993-06'
        }
    ],
    annenErfaring: [
        {
            rolle: 'maskinsjef steam',
            beskrivelse: 'maskinsjef steam for brovig tank rederi',
            fraDato: '1988-02',
            tilDato: null
        },
        {
            rolle: 'vice presidet ',
            beskrivelse: 'vice presidet  for new england pump and valve',
            fraDato: '2007-08',
            tilDato: '2009-05'
        },
        {
            rolle: 'technical director',
            beskrivelse: 'technical director for cunard cruise line',
            fraDato: '2003-05',
            tilDato: '2007-09'
        },
        {
            rolle: 'technical director',
            beskrivelse: 'technical director for norwegian cruise line',
            fraDato: '2005-07',
            tilDato: '2007-06'
        },
        {
            rolle: 'maskinsjef',
            beskrivelse: 'maskinsjef for crystal cruise',
            fraDato: '1991-04',
            tilDato: '2003-05'
        }
    ],
    forerkort: [
        {
            klasse: 'B'
        },
        {
            klasse: 'C1'
        }
    ],
    kurs: [
        {
            tittel: 'huet',
            arrangor: 'falk',
            tidspunkt: '2016-10',
            varighet: {
                varighet: 1,
                tidsenhet: KursVarighetEnhet.UKE
            }
        },
        {
            tittel: 'Brillekurs',
            arrangor: 'Norsk Brilleslangeforbund',
            tidspunkt: '2022-08-01',
            varighet: {
                varighet: 2,
                tidsenhet: KursVarighetEnhet.MND
            }
        },

        {
            tittel: 'blå',
            arrangor: 'falk',
            tidspunkt: '2018-10'
        },
        {
            tittel: 'dynamik posisjonering',
            arrangor: 'kongsberg',
            tidspunkt: '2010-08'
        }
    ],
    godkjenninger: [
        {
            tittel: 'Autorisasjon som lege',
            utsteder: 'Norsk legeforening',
            gjennomfortDato: '2018-05-17',
            utloperDato: '2118-12-31'
        },
        {
            tittel: 'Bårførerbevis',
            utsteder: null,
            gjennomfortDato: '2020-02-02',
            utloperDato: null
        }
    ],
    andreGodkjenninger: [
        {
            tittel: 'Sikkerhetskurs: Diverse spesialkurs',
            utsteder: 'Diverse spesialkurs A/S',
            gjennomfortDato: '2018-05-04',
            utloperDato: '2118-12-20'
        },
        {
            tittel: 'Maskinoffisersertifikat: Klasse 1',
            utsteder: 'Norsk maskinoffiserskole',
            gjennomfortDato: '2014-12',
            utloperDato: '2118-12'
        },
        {
            tittel: 'Kjelpassersertifikat: Rødt sertifikat',
            utsteder: null,
            gjennomfortDato: '1974-07',
            utloperDato: null
        }
    ],
    sprak: [
        {
            sprak: 'Dansk',
            muntligNiva: SprakNiva.FOERSTESPRAAK,
            skriftligNiva: 'Godt'
        },
        {
            sprak: 'Svensk',
            muntligNiva: 'Godt',
            skriftligNiva: 'Godt'
        },
        {
            sprak: 'Engelsk',
            muntligNiva: 'Godt',
            skriftligNiva: 'Godt'
        },
        {
            sprak: 'Tysk',
            muntligNiva: 'Godt',
            skriftligNiva: 'Godt'
        }
    ],
    jobbprofil: {
        sistEndret: '2019-01-15T07:52:35.462+01:00',
        onsketYrke: [
            {
                tittel: 'Vinduspusser'
            }
        ],
        onsketArbeidssted: [
            {
                stedsnavn: 'Søgne'
            },
            {
                stedsnavn: 'Østfold'
            },
            {
                stedsnavn: 'Akershus'
            },
            {
                stedsnavn: 'Oslo'
            },
            {
                stedsnavn: 'Oppland'
            },
            {
                stedsnavn: 'Buskerud'
            },
            {
                stedsnavn: 'Vestfold'
            },
            {
                stedsnavn: 'Telemark'
            },
            {
                stedsnavn: 'Aust-Agder'
            },
            {
                stedsnavn: 'Vest-Agder'
            },
            {
                stedsnavn: 'Rogaland'
            },
            {
                stedsnavn: 'Hordaland'
            },
            {
                stedsnavn: 'Sogn og Fjordane'
            },
            {
                stedsnavn: 'Møre og Romsdal'
            },
            {
                stedsnavn: 'Nordland'
            },
            {
                stedsnavn: 'Finnmark'
            },
            {
                stedsnavn: 'Øvrige områder'
            },
            {
                stedsnavn: 'Trøndelag'
            }
        ],
        onsketAnsettelsesform: [
            {
                tittel: 'VIKARIAT'
            },
            {
                tittel: 'ENGASJEMENT'
            },
            {
                tittel: 'PROSJEKT'
            },
            {
                tittel: 'FAST'
            },
            {
                tittel: 'SESONG'
            },
            {
                tittel: 'LAERLING'
            },
            {
                tittel: 'SELVSTENDIG_NAERINGSDRIVENDE'
            },
            {
                tittel: 'FERIEJOBB'
            },
            {
                tittel: 'ANNET'
            }
        ],
        onsketArbeidstidsordning: [
            {
                tittel: 'DAGTID'
            },
            {
                tittel: 'KVELD'
            },
            {
                tittel: 'NATT'
            }
        ],

        onsketArbeidsdagordning: [
            {
                tittel: 'UKEDAGER'
            },
            {
                tittel: 'LOERDAG'
            },
            {
                tittel: 'SOENDAG'
            }
        ],
        onsketArbeidsskiftordning: [
            {
                tittel: 'SKIFT'
            },
            {
                tittel: 'VAKT'
            },
            {
                tittel: 'TURNUS'
            }
        ],
        heltidDeltid: {
            heltid: true,
            deltid: true
        },
        kompetanse: [
            {
                tittel: 'Salg av utstyr til bakeribransjen'
            },
            {
                tittel: 'Førstehjelpskurs for strømulykker'
            }
        ],
        oppstart: JobbprofilOppstartstype.ETTER_TRE_MND
    }
};

const personalia: PersonaliaInfo = {
    fornavn: 'Bruce',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    barn: [
        {
            fornavn: 'Bruce',
            fodselsdato: '2016-04-17',
            gradering: Gradering.UKJENT,
            erEgenAnsatt: false,
            harVeilederTilgang: false,
            dodsdato: null,
            relasjonsBosted: RelasjonsBosted.ANNET_BOSTED
        },
        {
            fornavn: 'Harry',
            fodselsdato: '2014-05-24',
            gradering: Gradering.UKJENT,
            erEgenAnsatt: false,
            harVeilederTilgang: false,
            dodsdato: null,
            relasjonsBosted: RelasjonsBosted.SAMME_BOSTED
        },
        {
            fornavn: 'Satoshi',
            fodselsdato: '2005-10-04',
            erEgenAnsatt: false,
            harVeilederTilgang: true,
            gradering: Gradering.UKJENT,
            dodsdato: '2023-11-11',
            relasjonsBosted: RelasjonsBosted.UKJENT_BOSTED
        }
    ],
    kontonummer: '12345678911',
    geografiskEnhet: {
        enhetsnummer: '0106',
        navn: 'NAV Fredrikstad'
    },
    telefon: [
        {
            prioritet: '1',
            telefonNr: '+4746333333',
            registrertDato: '10.07.2008',
            master: 'FREG'
        },
        {
            prioritet: '2',
            telefonNr: '80022222',
            registrertDato: '10.04.2010',
            master: 'KRR'
        },
        {
            prioritet: '3',
            telefonNr: '44222444',
            registrertDato: null,
            master: 'PDL'
        }
    ],
    epost: {
        epostAdresse: 'tester.scrambling@registre.no',
        epostSistOppdatert: '10.04.2010',
        master: 'KRR'
    },
    statsborgerskap: ['NORGE', 'POLEN'],
    partner: {
        gradering: Gradering.UKJENT,
        erEgenAnsatt: true,
        harSammeBosted: true,
        harVeilederTilgang: false
    },
    sivilstandliste: [
        {
            sivilstand: 'Gift',
            fraDato: '2012-08-20',
            skjermet: null,
            gradering: Gradering.UKJENT,
            relasjonsBosted: RelasjonsBosted.SAMME_BOSTED,
            master: 'Freg',
            registrertDato: null
        },
        {
            sivilstand: 'Separert_partner',
            fraDato: '2019-06-01',
            skjermet: false,
            gradering: Gradering.UKJENT,
            relasjonsBosted: null,
            master: 'PDL',
            registrertDato: '2019-06-15T10:30:44'
        },
        {
            sivilstand: 'Skilt',
            fraDato: '2020-09-03',
            skjermet: true,
            gradering: Gradering.UKJENT,
            relasjonsBosted: RelasjonsBosted.UKJENT_BOSTED,
            master: 'PDL',
            registrertDato: '2020-09-05T11:30:15'
        }
    ],
    bostedsadresse: {
        coAdressenavn: 'CoAdresseNavn',
        vegadresse: {
            matrikkelId: null,
            postnummer: '0000',
            husnummer: '21',
            husbokstav: 'A',
            kommunenummer: '1111',
            adressenavn: 'Arendalsegate',
            tilleggsnavn: 'Arendal',
            poststed: 'Posted',
            kommune: 'Kommune'
        },
        matrikkeladresse: {
            matrikkelId: null,
            bruksenhetsnummer: 'H0101',
            tilleggsnavn: 'Ja',
            kommunenummer: '8008',
            postnummer: '1337',
            poststed: 'Sandvika',
            kommune: 'Blærum'
        },
        utenlandskAdresse: {
            adressenavnNummer: 'AdressenavnNummer?',
            bygningEtasjeLeilighet: 'H4290',
            postboksNummerNavn: '42',
            postkode: '1337',
            bySted: 'Shanghai',
            regionDistriktOmraade: 'Shanghai',
            landkode: 'CN'
        },
        ukjentBosted: {
            bostedskommune: 'Vinje',
            kommune: 'Kommune'
        }
    },
    oppholdsadresse: null,
    kontaktadresser: [
        {
            type: 'Utland',
            coAdressenavn: null,
            vegadresse: null,
            postboksadresse: null,
            postadresseIFrittFormat: null,
            utenlandskAdresse: null,
            utenlandskAdresseIFrittFormat: {
                adresselinje1: 'C/O adresse2 Test',
                adresselinje2: 'Adresselinje 2',
                adresselinje3: 'Adresselinje 3',
                byEllerStedsnavn: 'Stedsnavn',
                postkode: '1234',
                landkode: 'Landkode'
            }
        }
    ],
    kjonn: 'K',
    malform: 'Polsk'
};

const mockVergeOgFullmakt: VergeOgFullmaktData = {
    vergemaalEllerFremtidsfullmakt: [
        {
            type: Vergetype.MINDREAARIG,
            embete: 'Fylkesmannen i Agder',
            vergeEllerFullmektig: {
                navn: {
                    fornavn: 'fornavn',
                    mellomnavn: 'mellomnavn',
                    etternavn: 'etternavn'
                },
                motpartsPersonident: '1234567890',
                omfang: VergemaalEllerFullmaktOmfangType.OEKONOMISKE_INTERESSER
            },
            folkeregistermetadata: {
                ajourholdstidspunkt: '2021-03-02T13:00:42',
                gyldighetstidspunkt: null
            }
        }
    ],
    fullmakt: [
        {
            motpartsPersonident: '1234567890',
            motpartsPersonNavn: {
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
                forkortetNavn: 'Nordmann Ola'
            },
            motpartsRolle: 'FULLMEKTIG',
            omraader: [
                {
                    kode: 'AAP',
                    beskrivelse: 'Arbeidsavklaringspenger'
                },
                {
                    kode: 'DAG',
                    beskrivelse: 'Dagpenger'
                }
            ],
            gyldigFraOgMed: '2021-03-02T13:00:42',
            gyldigTilOgMed: '2021-03-03T13:00:42'
        },
        {
            motpartsPersonident: '1234567891',
            motpartsPersonNavn: {
                fornavn: 'Ola',
                mellomnavn: null,
                etternavn: 'Nordmann',
                forkortetNavn: 'Nordmann Ola'
            },
            motpartsRolle: 'FULLMAKTSGIVER',
            omraader: [
                {
                    kode: '*',
                    beskrivelse: 'alle ytelser'
                }
            ],
            gyldigFraOgMed: '2021-03-04T13:00:42',
            gyldigTilOgMed: '2021-03-05T13:00:42'
        }
    ]
};

const mockTilrettelagtKommunikasjon: TilrettelagtKommunikasjonData = {
    talespraak: 'Engelsk',
    tegnspraak: 'Fransk'
};

// Kan brukes for å teste gammel ordinær registrering istedenfor sykmeldt registrering
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ordinaerRegistering: RegistreringsData = {
    type: 'ORDINAER',
    registrering: {
        opprettetDato: '2018-08-30T09:17:28.386804+02:00',
        manueltRegistrertAv: {
            ident: 'Z21345567',
            enhet: {
                id: '1234',
                navn: 'NAV TESTHEIM'
            }
        },
        besvarelse: {
            utdanning: 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
            utdanningBestatt: 'JA',
            utdanningGodkjent: 'JA',
            helseHinder: 'NEI',
            andreForhold: 'NEI',
            sisteStilling: 'INGEN_SVAR',
            dinSituasjon: 'DELTIDSJOBB_VIL_MER'
        },
        profilering: {
            jobbetSammenhengendeSeksAvTolvSisteManeder: true,
            innsatsgruppe: 'BEHOV_FOR_ARBEIDSEVNEVURDERING'
        },
        teksterForBesvarelse: [
            {
                sporsmalId: 'dinSituasjon',
                sporsmal: 'Hvorfor registrerer du deg?',
                svar: 'Jeg har deltidsjobb, men vil jobbe mer'
            },
            {
                sporsmalId: 'sisteStilling',
                sporsmal: 'Din siste jobb',
                svar: 'Fotpleier'
            },
            {
                sporsmalId: 'utdanning',
                sporsmal: 'Hva er din høyeste fullførte utdanning?',
                svar: 'Videregående, fagbrev eller svennebrev (3 år eller mer)'
            },
            {
                sporsmalId: 'utdanningGodkjent',
                sporsmal: 'Er utdanningen din godkjent i Norge?',
                svar: 'Ja'
            },
            {
                sporsmalId: 'utdanningBestatt',
                sporsmal: 'Er utdanningen din bestått?',
                svar: 'Ja'
            },
            {
                sporsmalId: 'helseHinder',
                sporsmal: 'Trenger du oppfølging i forbindelse med helseutfordringer?',
                svar: 'Nei'
            },
            {
                sporsmalId: 'andreForhold',
                sporsmal: 'Trenger du oppfølging i forbindelse med andre utfordringer?',
                svar: 'Nei'
            }
        ]
    }
};

// Kan brukes for å teste sykmeldt registrering istedenfor ordinær registrering
// @ts-ignore
const sykmeldtRegistering: RegistreringsData = {
    registrering: {
        opprettetDato: '2022-06-17T13:41:43.122+02:00',
        besvarelse: {
            utdanning: null,
            utdanningBestatt: null,
            utdanningGodkjent: null,
            helseHinder: null,
            andreForhold: null,
            sisteStilling: null,
            dinSituasjon: null,
            fremtidigSituasjon: 'SAMME_ARBEIDSGIVER',
            tilbakeIArbeid: 'JA_REDUSERT_STILLING'
        },
        teksterForBesvarelse: [
            {
                sporsmalId: 'fremtidigSituasjon',
                sporsmal: 'Hva tenker du om din fremtidige situasjon?',
                svar: 'Jeg skal tilbake til jobben jeg har'
            },
            {
                sporsmalId: 'tilbakeIArbeid',
                sporsmal: 'Tror du at du kommer tilbake i jobb før du har vært sykmeldt i 52 uker?',
                svar: 'Ja, i redusert stilling'
            }
        ],
        manueltRegistrertAv: {
            ident: 'Z991227',
            enhet: {
                id: '0501',
                navn: 'NAV Lillehammer-Gausdal'
            }
        }
    },
    type: 'SYKMELDT'
};

const opplysninerOmArbeidssoeker = {
    opplysningerOmArbeidssoekerId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    periodeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    sendtInnAv: {
        tidspunkt: '2024-09-29T11:22:33.444Z',
        utfoertAv: {
            type: 'VEILEDER',
            id: 'Z1234567'
        },
        kilde: 'string',
        aarsak: 'string'
    },
    utdanning: {
        nus: '7',
        bestaatt: 'JA',
        godkjent: 'JA'
    },
    helse: {
        helsetilstandHindrerArbeid: 'JA'
    },
    annet: {
        andreForholdHindrerArbeid: 'JA'
    },
    jobbsituasjon: [
        {
            beskrivelse: 'HAR_SAGT_OPP',
            detaljer: {
                prosent: '25'
            }
        },
        {
            beskrivelse: 'ER_PERMITTERT',
            detaljer: {
                prosent: '95'
            }
        }
    ]
};

const profilering = {
    profileringId: '3fa85f64-5717-4562-b3fc-2c963f66afa8',
    periodeId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    opplysningerOmArbeidssoekerId: '3fa85f64-5717-4562-b3fc-2c963f66afa7',
    sendtInnAv: {
        tidspunkt: '2021-09-29T11:22:33.444Z',
        utfoertAv: {
            type: 'VEIELEDER'
        },
        kilde: 'string',
        aarsak: 'string'
    },
    profilertTil: 'ANTATT_BEHOV_FOR_VEILEDNING',
    jobbetSammenhengendeSeksAvTolvSisteManeder: true,
    alder: 0
};

const opplysningerMedProfilering = {
    opplysningerOmArbeidssoeker: opplysninerOmArbeidssoeker,
    profilering: profilering
};
const mockEndringIRegistreringsData: EndringIRegistreringsdata = {
    erBesvarelsenEndret: true,
    endretAv: 'BRUKER',
    registreringsTidspunkt: '2023-07-17T11:27:25.299658',
    registreringsId: 10004400,
    opprettetAv: 'BRUKER',
    endretTidspunkt: '2023-07-18T11:24:03.158629',
    besvarelse: {
        helseHinder: {
            endretAv: null,
            verdi: 'NEI',
            gjelderTilDato: null,
            gjelderFraDato: null,
            endretTidspunkt: null
        },
        utdanning: {
            verdi: 'HOYERE_UTDANNING_1_TIL_4',
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        utdanningBestatt: {
            verdi: 'JA',
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        utdanningGodkjent: {
            verdi: 'JA',
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        andreForhold: {
            verdi: 'NEI',
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        sisteStilling: {
            verdi: 'INGEN_SVAR',
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        dinSituasjon: {
            verdi: 'OPPSIGELSE',
            tilleggsData: {
                forsteArbeidsdagDato: null,
                sisteArbeidsdagDato: '2023-07-31',
                oppsigelseDato: '2023-07-19',
                gjelderFraDato: null,
                permitteringsProsent: null,
                stillingsProsent: null,
                permitteringForlenget: null,
                harNyJobb: null
            },
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: 'BRUKER',
            endretTidspunkt: '2023-07-18T11:24:03.136693338'
        },
        fremtidigSituasjon: {
            verdi: null,
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        },
        tilbakeIArbeid: {
            verdi: null,
            gjelderFraDato: null,
            gjelderTilDato: null,
            endretAv: null,
            endretTidspunkt: null
        }
    }
};

export const veilarbpersonHandlers: RequestHandler[] = [
    http.post('/veilarbperson/api/v3/person/hent-cv_jobbprofil', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(cvOgJobbonsker);
    }),
    http.post('/veilarbperson/api/v3/person/hent-aktorid', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(aktorId);
    }),
    http.post('/veilarbperson/api/v3/person/hent-registrering', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(sykmeldtRegistering);
    }),
    http.post('/veilarbperson/api/v3/person/registrering/hent-endringer', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(mockEndringIRegistreringsData);
    }),
    http.post('/veilarbperson/api/v3/hent-person', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(personalia);
    }),
    http.post('/veilarbperson/api/v3/person/hent-vergeOgFullmakt', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(mockVergeOgFullmakt);
    }),
    http.post('/veilarbperson/api/v3/person/hent-tolk', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(mockTilrettelagtKommunikasjon);
    }),
    http.post('/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering', async () => {
        await delay(DEFAULT_DELAY_MILLISECONDS);
        return HttpResponse.json(opplysningerMedProfilering);
    })
];
