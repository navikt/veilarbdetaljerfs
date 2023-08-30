import { BodyShort, CopyButton } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import '../fellesStyling.css';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function EnkeltInformasjonMedCopy({ header, value = EMDASH }: Props) {
    const showCopyButton = value !== EMDASH && value !== null;
    return (
        <span>
            <BodyShort size="small" className="copy_header">
                {header}
            </BodyShort>
            <span className={`copy_body ${showCopyButton ? 'without_emdash' : 'with_emdash'}`}>
                <BodyShort size="small">{value}</BodyShort>
                {showCopyButton && <CopyButton copyText={value} size="xsmall" />}
            </span>
        </span>
    );
}
