import { BodyShort, Detail } from '@navikt/ds-react';
import { PersonaliaEpost } from '../../data/api/datatyper/personalia';
import { hentKilde } from '../../utils/konstanter';
import EMDASH from '../../utils/emdash';
import { OrNothing } from '../../utils/felles-typer';
import { isNullOrUndefined } from '../../utils/felles-typer';
import Informasjonsbolk from '../felles/informasjonsbolk';

function Epost(props: { epost: OrNothing<PersonaliaEpost> }) {
    const { epost, ...rest } = props;

    if (isNullOrUndefined(epost?.epostAdresse)) {
        return (
            <Informasjonsbolk header="Epost" {...rest}>
                {EMDASH}
            </Informasjonsbolk>
        );
    }

    const { epostAdresse, epostSistOppdatert, master } = epost!;

    return (
        <Informasjonsbolk header="Epost" {...rest}>
            <BodyShort className="innrykk wrap-anywhere flex-align-center">{epostAdresse}</BodyShort>
            <Detail className="kilde-tekst">
                <span>
                    Registrert {epostSistOppdatert && epostSistOppdatert}
                    {` ${hentKilde(master)}`}
                </span>
            </Detail>
        </Informasjonsbolk>
    );
}

export default Epost;
