import { BodyShort, CopyButton, Detail } from '@navikt/ds-react';
import { PersonaliaInfo, PersonaliaTelefon } from '../../data/api/datatyper/personalia';
import EMDASH from '../../utils/emdash';
import { formaterTelefonnummer } from '../../utils/formater';
import { hentKilde } from '../../utils/konstanter';
import { isNotEmptyArray } from '../../utils/felles-typer';

function TelefonNrMedKilde(props: { telefon: PersonaliaTelefon }) {
    const { telefonNr, registrertDato, master } = props.telefon;

    return (
        <>
            <BodyShort size="small" className="copy_body">
                {formaterTelefonnummer(telefonNr)}
                <CopyButton copyText={telefonNr} size="xsmall" />
            </BodyShort>

            {telefonNr && (
                <Detail className="kilde_tekst">
                    Registrert {registrertDato && registrertDato}
                    {` ${hentKilde(master)}`}
                </Detail>
            )}
        </>
    );
}

function Telefon({ telefon }: Pick<PersonaliaInfo, 'telefon'>) {
    const telefonListe = isNotEmptyArray(telefon)
        ? telefon.map((telefon, index) => <TelefonNrMedKilde telefon={telefon} key={index} />)
        : EMDASH;

    return (
        <>
            <BodyShort size="small" className="body_header">
                Telefon
            </BodyShort>
            <div className="enkeltinfo_value">{telefonListe}</div>
        </>
    );
}

export default Telefon;
