import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon({ header, value = EMDASH }: Props) {
    return (
        <span>
            <Heading level="5" size="xsmall">
                {header}
            </Heading>
            <BodyShort size="small">{value}</BodyShort>
        </span>
    );
}
