import '../overblikk.css';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    return (
        <BodyShort>
            <h3 className="overblikkTittel">{props.header}:</h3>
            <p className="overblikkUndertittel">{props?.value}</p>
        </BodyShort>
    );
}
