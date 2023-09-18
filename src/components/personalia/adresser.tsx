import { BodyShort } from '@navikt/ds-react';
import EMDASH, { visEmdashHvisNull } from '../../utils/emdash';
import {
    Kontaktadresse,
    Matrikkeladresse,
    PersonaliaInfo,
    PostadresseIFrittFormat,
    Postboksadresse,
    Ukjentbosted,
    Utenlandskadresse,
    UtenlandskadresseIFrittFormat,
    Vegadresse
} from '../../data/api/datatyper/personalia';
import { OrNothing, isNotEmptyArray, isNullOrUndefined } from '../../utils/felles-typer';

//function adresseForVisning(props: Oppholdsadresse | Bostedsadresse | Kontaktadresse) {
//if (props.vegadresse) {
//return <VegAdresse adresse={props.vegadresse} />;
//} else if ('matrikkeladresse' in props && props.matrikkeladresse) {
//return <MatrikkelAdresse adresse={props.matrikkeladresse} />;
//} else if (props.utenlandskAdresse) {
//return <UtenlandskAdresse adresse={props.utenlandskAdresse} />;
//} else if ('ukjentBosted' in props && props?.ukjentBosted) {
//return <UkjentBosted adresse={props.ukjentBosted} />;
//} else if ('postboksadresse' in props && props.postboksadresse) {
//return <PostboksAdresse adresse={props.postboksadresse} />;
//} else if ('postadresseIFrittFormat' in props && props.postadresseIFrittFormat) {
//return <PostAdresseIFrittFormat adresse={props.postadresseIFrittFormat} />;
//} else if ('utenlandskAdresseIFrittFormat' in props && props.utenlandskAdresseIFrittFormat) {
//return <UtenlandskAdresseIFrittFormat adresse={props.utenlandskAdresseIFrittFormat} />;
//}
//return null;
//}

function BostedsAdresse(props: Pick<PersonaliaInfo, 'bostedsadresse'>) {
    if (isNullOrUndefined(props.bostedsadresse)) {
        return null;
    }

    const vegadresse = props.bostedsadresse?.vegadresse;
    const matrikkeladrese = props.bostedsadresse?.matrikkeladresse;
    const utenlandskadresse = props.bostedsadresse?.utenlandskAdresse;
    const ukjentbosted = props.bostedsadresse?.ukjentBosted;
    const coAdressenavn = props.bostedsadresse?.coAdressenavn;
    let adresseVisning = null;

    if (vegadresse) {
        adresseVisning = <VegAdresse adresse={vegadresse} />;
    } else if (matrikkeladrese) {
        adresseVisning = <MatrikkelAdresse adresse={matrikkeladrese} />;
    } else if (utenlandskadresse) {
        adresseVisning = <UtenlandskAdresse adresse={utenlandskadresse} />;
    } else if (ukjentbosted) {
        adresseVisning = <UkjentBosted adresse={ukjentbosted} />;
    }

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="body_header">
                Bostedsadresse
            </BodyShort>
            <BodyShort size="small">{coAdressenavn || ''}</BodyShort>
            {!isNullOrUndefined(adresseVisning) ? adresseVisning : EMDASH}
        </div>
    );
}

function OppholdsAdresse(props: Pick<PersonaliaInfo, 'oppholdsadresse'>) {
    if (isNullOrUndefined(props.oppholdsadresse)) {
        return null;
    }

    const vegadresse = props.oppholdsadresse?.vegadresse;
    const matrikkeladrese = props.oppholdsadresse?.matrikkeladresse;
    const utenlandskadresse = props.oppholdsadresse?.utenlandskAdresse;
    const coAdressenavn = props.oppholdsadresse?.coAdressenavn;
    let adresseVisning = null;

    if (vegadresse) {
        adresseVisning = <VegAdresse adresse={vegadresse} />;
    } else if (matrikkeladrese) {
        adresseVisning = <MatrikkelAdresse adresse={matrikkeladrese} />;
    } else if (utenlandskadresse) {
        adresseVisning = <UtenlandskAdresse adresse={utenlandskadresse} />;
    }

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="body_header">
                Oppholdsadresse
            </BodyShort>
            <BodyShort size="small">{coAdressenavn || ''}</BodyShort>
            {!isNullOrUndefined(adresseVisning) ? adresseVisning : EMDASH}
        </div>
    );
}

function KontaktAdresse(props: { kontaktadresse: Kontaktadresse }) {
    if (isNullOrUndefined(props.kontaktadresse)) {
        return null;
    }

    const vegadresse = props.kontaktadresse?.vegadresse;
    const postboksadresse = props.kontaktadresse?.postboksadresse;
    const utenlandskadresse = props.kontaktadresse?.utenlandskAdresse;
    const postadresseIFrittFormat = props.kontaktadresse?.postadresseIFrittFormat;
    const utenlandskAdresseIFrittFormat = props.kontaktadresse?.utenlandskAdresseIFrittFormat;
    const coAdressenavn = props.kontaktadresse?.coAdressenavn;
    const adresseType = props.kontaktadresse?.type;
    let adresseVisning = null;

    if (vegadresse) {
        adresseVisning = <VegAdresse adresse={vegadresse} />;
    } else if (postboksadresse) {
        adresseVisning = <PostboksAdresse adresse={postboksadresse} />;
    } else if (utenlandskadresse) {
        adresseVisning = <UtenlandskAdresse adresse={utenlandskadresse} />;
    } else if (postadresseIFrittFormat) {
        adresseVisning = <PostAdresseIFrittFormat adresse={postadresseIFrittFormat} />;
    } else if (utenlandskAdresseIFrittFormat) {
        adresseVisning = <UtenlandskAdresseIFrittFormat adresse={utenlandskAdresseIFrittFormat} />;
    }

    return (
        <>
            <BodyShort size="small" className="body_header">
                Kontaktadresse {`(${adresseType})`}
            </BodyShort>
            <BodyShort size="small">{coAdressenavn || ''}</BodyShort>
            {!isNullOrUndefined(adresseVisning) ? adresseVisning : EMDASH}
        </>
    );
}

function VegAdresse(prop: { adresse: OrNothing<Vegadresse> }) {
    const { adressenavn, husnummer, husbokstav, postnummer, poststed, kommunenummer, kommune } =
        prop.adresse as Vegadresse;
    return (
        <>
            <BodyShort size="small">{`${adressenavn || ''} ${husnummer || ''}${husbokstav || ''}`}</BodyShort>
            <BodyShort size="small">{`${postnummer || ''} ${poststed || ''}`}</BodyShort>
            {kommunenummer && (
                <BodyShort size="small"> {`Kommune: ${kommunenummer || ''} ${kommune || ''}`} </BodyShort>
            )}
        </>
    );
}

function MatrikkelAdresse(prop: { adresse: OrNothing<Matrikkeladresse> }) {
    const { bruksenhetsnummer, tilleggsnavn, kommunenummer, postnummer, poststed, kommune } =
        prop.adresse as Matrikkeladresse;

    return (
        <>
            {bruksenhetsnummer && <BodyShort size="small"> {`Bolignummer ${bruksenhetsnummer}`} </BodyShort>}
            {tilleggsnavn && <BodyShort size="small"> {tilleggsnavn} </BodyShort>}
            {postnummer && <BodyShort size="small"> {`${postnummer} ${poststed || ''}`} </BodyShort>}
            {kommunenummer && <BodyShort size="small"> {`Kommune: ${kommunenummer} ${kommune || ''}`} </BodyShort>}
        </>
    );
}

function PostboksAdresse(prop: { adresse: Postboksadresse }) {
    const { postbokseier, postboks, postnummer, poststed } = prop.adresse as Postboksadresse;
    return (
        <>
            <BodyShort size="small">{`Postboks ${(postboks || '').trim()} ${postbokseier || ''}`}</BodyShort>
            <BodyShort size="small">{`${postnummer || ''} ${poststed || ''}`}</BodyShort>
        </>
    );
}

function UtenlandskAdresse(prop: { adresse: OrNothing<Utenlandskadresse> }) {
    const {
        adressenavnNummer,
        bygningEtasjeLeilighet,
        postboksNummerNavn,
        postkode,
        bySted,
        regionDistriktOmraade,
        landkode
    } = prop.adresse as Utenlandskadresse;

    return (
        <>
            <BodyShort size="small">{adressenavnNummer || ''}</BodyShort>
            <BodyShort size="small">{bygningEtasjeLeilighet || ''}</BodyShort>
            <BodyShort size="small">{postboksNummerNavn || ''}</BodyShort>
            <BodyShort size="small">{postkode || ''}</BodyShort>
            <BodyShort size="small">{bySted || ''}</BodyShort>
            <BodyShort size="small">{regionDistriktOmraade || ''}</BodyShort>
            <BodyShort size="small">{landkode || ''}</BodyShort>
        </>
    );
}

function UkjentBosted(prop: { adresse: OrNothing<Ukjentbosted> }) {
    const { bostedskommune, kommune } = prop.adresse as Ukjentbosted;

    return (
        <>{bostedskommune && <BodyShort size="small"> {`Kommune: ${bostedskommune} ${kommune || ''}`} </BodyShort>}</>
    );
}

function UtenlandskAdresseIFrittFormat(props: { adresse: OrNothing<UtenlandskadresseIFrittFormat> }) {
    const { adresselinje1, adresselinje2, adresselinje3, byEllerStedsnavn, landkode, postkode } =
        props.adresse as UtenlandskadresseIFrittFormat;

    return (
        <>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje1)} </BodyShort>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje2)} </BodyShort>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje3)} </BodyShort>
            <BodyShort size="small"> {`${postkode || ''} ${byEllerStedsnavn || ''}`} </BodyShort>
            <BodyShort size="small"> {landkode || ''} </BodyShort>
        </>
    );
}

function PostAdresseIFrittFormat(props: { adresse: OrNothing<PostadresseIFrittFormat> }) {
    const { adresselinje1, adresselinje2, adresselinje3, postnummer, poststed } =
        props.adresse as PostadresseIFrittFormat;

    return (
        <>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje1)} </BodyShort>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje2)} </BodyShort>
            <BodyShort size="small"> {visEmdashHvisNull(adresselinje3)} </BodyShort>
            <BodyShort size="small"> {`${postnummer || ''} ${poststed || ''}`} </BodyShort>
        </>
    );
}

type Props = Pick<PersonaliaInfo, 'bostedsadresse'> &
    Pick<PersonaliaInfo, 'oppholdsadresse'> &
    Pick<PersonaliaInfo, 'kontaktadresser'>;

function Adresser(props: Props) {
    const { bostedsadresse, oppholdsadresse, kontaktadresser } = props;

    return (
        <>
            {bostedsadresse && <BostedsAdresse bostedsadresse={bostedsadresse} />}
            {oppholdsadresse && <OppholdsAdresse oppholdsadresse={oppholdsadresse} />}
            {isNotEmptyArray(kontaktadresser)
                ? kontaktadresser.map((kontaktadresse, index) => (
                      <KontaktAdresse kontaktadresse={kontaktadresse} key={index} />
                  ))
                : null}
            {!bostedsadresse && !oppholdsadresse && !isNotEmptyArray(kontaktadresser) && (
                <div className="underinformasjon">
                    <BodyShort size="small" className="body_header">
                        Adresse
                    </BodyShort>
                    <BodyShort size="small">{EMDASH}</BodyShort>
                </div>
            )}
        </>
    );
}

export default Adresser;
