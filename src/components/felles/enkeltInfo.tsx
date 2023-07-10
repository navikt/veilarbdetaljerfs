import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    const value = props?.value !== undefined ? props.value : EMDASH;
    return (
        <span>
            <Heading level="5" size="xsmall">
                {props.header}
            </Heading>
            <BodyShort size="small">{value}</BodyShort>
        </span>
    );
}
