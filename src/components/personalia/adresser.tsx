import { BodyShort, Label } from '@navikt/ds-react';
import EMDASH, { visEmdashHvisNull } from '../../utils/emdash';
import {
    Kontaktadresse,
    Matrikkeladresse,
    PersonaliaV2Info,
    PostadresseIFrittFormat,
    Postboksadresse,
    Ukjentbosted,
    Utenlandskadresse,
    UtenlandskadresseIFrittFormat,
    Vegadresse,
    Oppholdsadresse,
    Bostedsadresse
} from '../../data/api/datatyper/personalia';
import { OrNothing, isNotEmptyArray, isNullOrUndefined } from '../../utils/felles-typer';

function adresseForVisning(props: Oppholdsadresse | Bostedsadresse | Kontaktadresse) {
    if (props.vegadresse) {
        return <VegAdresse adresse={props.vegadresse} />;
    } else if ('matrikkeladresse' in props && props.matrikkeladresse) {
        return <MatrikkelAdresse adresse={props.matrikkeladresse} />;
    } else if (props.utenlandskAdresse) {
        return <UtenlandskAdresse adresse={props.utenlandskAdresse} />;
    } else if ('ukjentBosted' in props && props?.ukjentBosted) {
        return <UkjentBosted adresse={props.ukjentBosted} />;
    } else if ('postboksadresse' in props && props.postboksadresse) {
        return <PostboksAdresse adresse={props.postboksadresse} />;
    } else if ('postadresseIFrittFormat' in props && props.postadresseIFrittFormat) {
        return <PostAdresseIFrittFormat adresse={props.postadresseIFrittFormat} />;
    } else if ('utenlandskAdresseIFrittFormat' in props && props.utenlandskAdresseIFrittFormat) {
        return <UtenlandskAdresseIFrittFormat adresse={props.utenlandskAdresseIFrittFormat} />;
    }
    return null;
}

function BostedsAdresse(props: Pick<PersonaliaV2Info, 'bostedsadresse'>) {
    if (isNullOrUndefined(props.bostedsadresse)) {
        return null;
    }

    const vegadresse = props.bostedsadresse?.vegadresse;
    const matrikkeladrese = props.bostedsadresse?.matrikkeladresse;
    const utenlandskadresse = props.bostedsadresse?.utenlandskAdresse;
    const ukjentbosted = props.bostedsadresse?.ukjentBosted;
    const coAdressenavn = props.bostedsadresse?.coAdressenavn;

    adresseForVisning(vegadresse, props);
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
            <Label size="small" as="p">
                Bostedsadresse
            </Label>
            <BodyShort className="innrykk">{coAdressenavn || ''}</BodyShort>
            {!isNullOrUndefined(adresseVisning) ? adresseVisning : EMDASH}
        </div>
    );
}

function OppholdsAdresse(props: Pick<PersonaliaV2Info, 'oppholdsadresse'>) {
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
            <Label size="small" as="p">
                Oppholdsadresse
            </Label>
            <BodyShort className="innrykk">{coAdressenavn || ''}</BodyShort>
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
        <div className="underinformasjon">
            <Label size="small" as="p">
                Kontaktadresse {`(${adresseType})`}
            </Label>
            <BodyShort className="innrykk">{coAdressenavn || ''}</BodyShort>
            {!isNullOrUndefined(adresseVisning) ? adresseVisning : EMDASH}
        </div>
    );
}

function VegAdresse(prop: { adresse: OrNothing<Vegadresse> }) {
    const { adressenavn, husnummer, husbokstav, postnummer, poststed, kommunenummer, kommune } =
        prop.adresse as Vegadresse;
    return (
        <div className="innrykk">
            <BodyShort>{`${adressenavn || ''} ${husnummer || ''}${husbokstav || ''}`}</BodyShort>
            <BodyShort>{`${postnummer || ''} ${poststed || ''}`}</BodyShort>
            {kommunenummer && <BodyShort> {`Kommune: ${kommunenummer || ''} ${kommune || ''}`} </BodyShort>}
        </div>
    );
}

function MatrikkelAdresse(prop: { adresse: OrNothing<Matrikkeladresse> }) {
    const { bruksenhetsnummer, tilleggsnavn, kommunenummer, postnummer, poststed, kommune } =
        prop.adresse as Matrikkeladresse;

    return (
        <div className="innrykk">
            {bruksenhetsnummer && <BodyShort> {`Bolignummer ${bruksenhetsnummer}`} </BodyShort>}
            {tilleggsnavn && <BodyShort> {tilleggsnavn} </BodyShort>}
            {postnummer && <BodyShort> {`${postnummer} ${poststed || ''}`} </BodyShort>}
            {kommunenummer && <BodyShort> {`Kommune: ${kommunenummer} ${kommune || ''}`} </BodyShort>}
        </div>
    );
}

function PostboksAdresse(prop: { adresse: Postboksadresse }) {
    const { postbokseier, postboks, postnummer, poststed } = prop.adresse as Postboksadresse;
    return (
        <div className="innrykk">
            <BodyShort>{`Postboks ${(postboks || '').trim()} ${postbokseier || ''}`}</BodyShort>
            <BodyShort>{`${postnummer || ''} ${poststed || ''}`}</BodyShort>
        </div>
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
        <div className="innrykk">
            <BodyShort>{adressenavnNummer || ''}</BodyShort>
            <BodyShort>{bygningEtasjeLeilighet || ''}</BodyShort>
            <BodyShort>{postboksNummerNavn || ''}</BodyShort>
            <BodyShort>{postkode || ''}</BodyShort>
            <BodyShort>{bySted || ''}</BodyShort>
            <BodyShort>{regionDistriktOmraade || ''}</BodyShort>
            <BodyShort>{landkode || ''}</BodyShort>
        </div>
    );
}

function UkjentBosted(prop: { adresse: OrNothing<Ukjentbosted> }) {
    const { bostedskommune, kommune } = prop.adresse as Ukjentbosted;

    return (
        <>
            {bostedskommune && (
                <BodyShort className="innrykk"> {`Kommune: ${bostedskommune} ${kommune || ''}`} </BodyShort>
            )}
        </>
    );
}

function UtenlandskAdresseIFrittFormat(props: { adresse: OrNothing<UtenlandskadresseIFrittFormat> }) {
    const { adresselinje1, adresselinje2, adresselinje3, byEllerStedsnavn, landkode, postkode } =
        props.adresse as UtenlandskadresseIFrittFormat;

    return (
        <div className="innrykk">
            <BodyShort> {visEmdashHvisNull(adresselinje1)} </BodyShort>
            <BodyShort> {visEmdashHvisNull(adresselinje2)} </BodyShort>
            <BodyShort> {visEmdashHvisNull(adresselinje3)} </BodyShort>
            <BodyShort> {`${postkode || ''} ${byEllerStedsnavn || ''}`} </BodyShort>
            <BodyShort> {landkode || ''} </BodyShort>
        </div>
    );
}

function PostAdresseIFrittFormat(props: { adresse: OrNothing<PostadresseIFrittFormat> }) {
    const { adresselinje1, adresselinje2, adresselinje3, postnummer, poststed } =
        props.adresse as PostadresseIFrittFormat;

    return (
        <div className="innrykk">
            <BodyShort> {visEmdashHvisNull(adresselinje1)} </BodyShort>
            <BodyShort> {visEmdashHvisNull(adresselinje2)} </BodyShort>
            <BodyShort> {visEmdashHvisNull(adresselinje3)} </BodyShort>
            <BodyShort> {`${postnummer || ''} ${poststed || ''}`} </BodyShort>
        </div>
    );
}

type Props = Pick<PersonaliaV2Info, 'bostedsadresse'> &
    Pick<PersonaliaV2Info, 'oppholdsadresse'> &
    Pick<PersonaliaV2Info, 'kontaktadresser'>;

function Adresser(props: Props) {
    const { bostedsadresse, oppholdsadresse, kontaktadresser, ...rest } = props;
    const kontaktadresseList = isNotEmptyArray(kontaktadresser)
        ? kontaktadresser.map((kontaktadresse, index) => <KontaktAdresse kontaktadresse={kontaktadresse} key={index} />)
        : EMDASH;
    return (
        <div {...rest}>
            <BostedsAdresse bostedsadresse={bostedsadresse} />
            <OppholdsAdresse oppholdsadresse={oppholdsadresse} />
            {kontaktadresseList}
        </div>
    );
}

export default Adresser;
