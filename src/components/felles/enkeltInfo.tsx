import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import {Alert, BodyShort} from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
    error?: StringOrNothing;
}

export function EnkeltInformasjon({ header, value = EMDASH, error }: Props) {
    return (
        <span>
            <BodyShort size="small" className="body_header">
                {header}
            </BodyShort>
            {!error &&
            <BodyShort size="small" className="enkeltinfo_value">
                {value}
            </BodyShort>
            }
            {error &&
            <Alert variant="error" inline size="small" >
                {error}
            </Alert>
            }
        </span>
    );
}
