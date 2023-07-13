import { BodyShort, CopyButton, Heading } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjonMedCopy({ header, value = EMDASH }: Props) {
    return (
        <BodyShort>
            <Heading level="5" size="xsmall" className="copyHeader">
                {header}
            </Heading>
            <span className="copyBody">
                <BodyShort size="small">{value}</BodyShort>
                <CopyButton copyText={value!} />
            </span>
        </BodyShort>
    );
}
