import { BodyShort, CopyButton, Detail } from '@navikt/ds-react';
import { PersonaliaInfo } from '../../data/api/datatyper/personalia';
import { isNullOrUndefined } from '../../utils/felles-typer';
import { hentKilde } from '../../utils/konstanter';
import EMDASH from '../../utils/emdash';

const Epostinnhold = ({ epost }: Pick<PersonaliaInfo, 'epost'>) => {
    if (isNullOrUndefined(epost?.epostAdresse)) {
        return <BodyShort size="small">{EMDASH}</BodyShort>;
    }

    const { epostAdresse, epostSistOppdatert, master } = epost!;
    return (
        <>
            <BodyShort size="small" className="copy_body">
                {epostAdresse}
                {epostAdresse && <CopyButton size="xsmall" copyText={epostAdresse} />}
            </BodyShort>
            <Detail className="kilde_tekst">
                Registrert {epostSistOppdatert && epostSistOppdatert}
                {` ${hentKilde(master)}`}
            </Detail>
        </>
    );
};

function Epost({ epost }: Pick<PersonaliaInfo, 'epost'>) {
    return (
        <div className="enkeltinfo_value">
            <BodyShort size="small" className="body_header">
                E-post
            </BodyShort>
            <Epostinnhold epost={epost} />
        </div>
    );
}

export default Epost;
