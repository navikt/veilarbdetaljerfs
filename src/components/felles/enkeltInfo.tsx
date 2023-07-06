import '../info.css';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjon(props: Props) {
    return (
        <span>
            <Heading level="5" size="xsmall">{props.header}:</Heading>
            <BodyShort size="small">{props?.value}</BodyShort>
        </span>
    );
}
