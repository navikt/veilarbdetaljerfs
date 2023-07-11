import { BodyShort, Detail } from '@navikt/ds-react';
import { Gradering, PersonaliaPartner, PersonaliaSivilstandNy } from '../../data/api/datatyper/personalia';
import EMDASH from '../../utils/emdash';
import {
    egenAnsattTekst,
    graderingBeskrivelsePartner,
    hentBorMedPartnerBeskrivelse,
    hentKilde
} from '../../utils/konstanter';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formatStringInUpperAndLowerCaseUnderscore, formaterDato } from '../../utils/formater';

function SivilstandBolk(props: { sivilstand: PersonaliaSivilstandNy }) {
    const { sivilstand, fraDato, skjermet, relasjonsBosted, gradering, master, registrertDato } = props.sivilstand;

    return (
        <div className="underinformasjon">
            <BodyShort className="innrykk">{formatStringInUpperAndLowerCaseUnderscore(sivilstand)}</BodyShort>
            {fraDato && <BodyShort className="innrykk">Fra: {formaterDato(fraDato)}</BodyShort>}
            {sivilstand && (
                <Detail className="kilde-tekst">
                    Registrert {registrertDato && formaterDato(registrertDato)}
                    {` ${hentKilde(master)}`}
                </Detail>
            )}
            {relasjonsBosted && (
                <BodyShort className="innrykk">{` ${hentBorMedPartnerBeskrivelse(relasjonsBosted)}`}</BodyShort>
            )}
            {gradering && gradering !== Gradering.UGRADERT && (
                <BodyShort className="innrykk">{` ${graderingBeskrivelsePartner(gradering)}`}</BodyShort>
            )}
            {skjermet && <BodyShort className="innrykk">{` ${egenAnsattTekst()}`}</BodyShort>}
        </div>
    );
}

function Sivilstand(props: { partner?: PersonaliaPartner; sivilstandliste?: PersonaliaSivilstandNy[] }) {
    const { partner, sivilstandliste, ...rest } = props;
    const sivilstandListe = sivilstandliste?.length
        ? sivilstandliste?.map((sivilstand, index) => <SivilstandBolk sivilstand={sivilstand} key={index} />)
        : EMDASH;

    return (
        <Informasjonsbolk header="Sivilstand" {...rest}>
            {sivilstandListe}
        </Informasjonsbolk>
    );
}

export default Sivilstand;
