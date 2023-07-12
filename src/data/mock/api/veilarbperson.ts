import { rest } from 'msw';
import { RequestHandler } from 'msw';
import {
    ArenaPerson,
    FagdokumentType,
    JobbprofilOppstartstype,
    KursVarighetEnhet,
    SprakNiva
} from '../../api/datatyper/arenaperson';
import { AktorId } from '../../api/datatyper/aktor-id';
import { Gradering, PersonaliaV2Info, RelasjonsBosted } from '../../api/datatyper/personalia';
import { VergemaalEllerFullmaktOmfangType, VergeOgFullmaktData, Vergetype } from '../../api/datatyper/vergeOgFullmakt';
import { TilrettelagtKommunikasjonData } from '../../api/datatyper/tilrettelagtKommunikasjon';
import { RegistreringsData } from '../../api/datatyper/registreringsData';

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

const personalia: PersonaliaV2Info = {
    fornavn: 'Bruce',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    barn: [
        {
            fornavn: 'Bruce',
            fodselsdato: '2016-04-17',
            gradering: 'Ny gradering fra PDL' as any,
            erEgenAnsatt: false,
            harVeilederTilgang: false,
            dodsdato: null,
            relasjonsBosted: RelasjonsBosted.ANNET_BOSTED
        },
        {
            fornavn: 'Harry',
            fodselsdato: '2014-05-24',
            gradering: Gradering.UGRADERT,
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
            gradering: Gradering.STRENGT_FORTROLIG,
            dodsdato: null,
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
    statsborgerskap: ['NORGE', 'POLEN'],
    partner: {
        gradering: Gradering.STRENGT_FORTROLIG_UTLAND,
        erEgenAnsatt: true,
        harSammeBosted: true,
        harVeilederTilgang: false
    },
    sivilstandliste: [
        {
            sivilstand: 'Gift',
            fraDato: '2012-08-20',
            skjermet: null,
            gradering: 'RANDOM_KODE' as any,
            relasjonsBosted: RelasjonsBosted.SAMME_BOSTED,
            master: 'Freg',
            registrertDato: null
        },
        {
            sivilstand: 'Separert_partner',
            fraDato: '2019-06-01',
            skjermet: false,
            gradering: 'Ny gradering fra PDL' as any,
            relasjonsBosted: null,
            master: 'PDL',
            registrertDato: '2019-06-15T10:30:44'
        },
        {
            sivilstand: 'Skilt',
            fraDato: '2020-09-03',
            skjermet: true,
            gradering: Gradering.UGRADERT,
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
    tegnspraak: null
};

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

export const veilarbpersonHandlers: RequestHandler[] = [
    rest.get('/veilarbperson/api/person/cv_jobbprofil', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(cvOgJobbonsker));
    }),
    rest.get('/veilarbperson/api/person/aktorid', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(aktorId));
    }),
    rest.get('/veilarbperson/api/person/registrering', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(ordinaerRegistering));
    }),
    rest.get('/veilarbperson/api/v2/person', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(personalia));
    }),
    rest.get('/veilarbperson/api/v2/person/vergeOgFullmakt', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockVergeOgFullmakt));
    }),
    rest.get('/veilarbperson/api/v2/person/tolk', (_, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockTilrettelagtKommunikasjon));
    })
];
