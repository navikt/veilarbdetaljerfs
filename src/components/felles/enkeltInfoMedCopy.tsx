import { BodyShort, CopyButton } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjonMedCopy({ header, value = EMDASH }: Props) {
    return (
        <span>
            <BodyShort size="small" className="copyHeader">
                {header}
            </BodyShort>
            <span className="copyBody">
                <BodyShort size="small">{value}</BodyShort>
                <CopyButton copyText={value!} />
            </span>
        </span>
    );
}
