import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon({ header, value = EMDASH }: Props) {
    return (
        <span>
            <BodyShort size="small" className="BodyHeader">
                {header}
            </BodyShort>
            <BodyShort size="small" className="EnkeltInfoValue">
                {value}
            </BodyShort>
        </span>
    );
}
