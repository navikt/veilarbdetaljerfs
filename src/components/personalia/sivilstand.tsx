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
import '../fellesStyling.css';
import { PersonGroupIcon } from '@navikt/aksel-icons';

function SivilstandBolk(props: { sivilstand: PersonaliaSivilstandNy }) {
    const { sivilstand, fraDato, skjermet, relasjonsBosted, gradering, master, registrertDato } = props.sivilstand;

    return (
        <div className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {formatStringInUpperAndLowerCaseUnderscore(sivilstand)}
            </BodyShort>
            {fraDato && (
                <BodyShort size="small" className="typografi_dato">
                    Fra: {formaterDato(fraDato)}
                </BodyShort>
            )}
            {sivilstand && (
                <Detail className="kilde_tekst">
                    Registrert {registrertDato && formaterDato(registrertDato)}
                    {` ${hentKilde(master)}`}
                </Detail>
            )}
            {relasjonsBosted && (
                <BodyShort size="small">{` ${hentBorMedPartnerBeskrivelse(relasjonsBosted)}`}</BodyShort>
            )}
            {gradering && gradering !== Gradering.UGRADERT && (
                <BodyShort size="small">{` ${graderingBeskrivelsePartner(gradering)}`}</BodyShort>
            )}
            {skjermet && <BodyShort size="small">{` ${egenAnsattTekst()}`}</BodyShort>}
        </div>
    );
}

function Sivilstand(props: { partner?: PersonaliaPartner; sivilstandliste?: PersonaliaSivilstandNy[] }) {
    const { sivilstandliste } = props;
    const sivilstandListe = sivilstandliste?.length
        ? sivilstandliste?.map((sivilstand, index) => <SivilstandBolk sivilstand={sivilstand} key={index} />)
        : EMDASH;

    return (
        <Informasjonsbolk
            header="Sivilstand"
            headerTypo="ingress"
            icon={<PersonGroupIcon title="a11y-title" aria-hidden="true" />}
        >
            {sivilstandListe}
        </Informasjonsbolk>
    );
}

export default Sivilstand;
