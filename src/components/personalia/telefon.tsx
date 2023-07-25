import { BodyShort, CopyButton, Detail } from '@navikt/ds-react';
import { PersonaliaV2Info, PersonaliaTelefon } from '../../data/api/datatyper/personalia';
import EMDASH from '../../utils/emdash';
import { formaterTelefonnummer } from '../../utils/formater';
import { hentKilde } from '../../utils/konstanter';
import { isNotEmptyArray } from '../../utils/felles-typer';

function TelefonNrMedKilde(props: { telefon: PersonaliaTelefon }) {
    const { telefonNr, registrertDato, master } = props.telefon;

    return (
        <div>
            <BodyShort size="small" className="copyTlf">
                {formaterTelefonnummer(telefonNr)}
                <CopyButton copyText={telefonNr} size="xsmall" />
            </BodyShort>
            <div className="tlf_registrert">
                {telefonNr && (
                    <Detail className="kilde-tekst">
                        Registrert {registrertDato && registrertDato}
                        {` ${hentKilde(master)}`}
                    </Detail>
                )}
            </div>
        </div>
    );
}

function Telefon({ telefon }: Pick<PersonaliaV2Info, 'telefon'>) {
    const telefonListe = isNotEmptyArray(telefon)
        ? telefon.map((telefon, index) => <TelefonNrMedKilde telefon={telefon} key={index} />)
        : EMDASH;

    return (
        <div>
            <BodyShort size="small" className="BodyHeader">
                Telefon
            </BodyShort>
            <BodyShort size="small" className="EnkeltInfoValue">
                {telefonListe}
            </BodyShort>
        </div>
    );
}

export default Telefon;
