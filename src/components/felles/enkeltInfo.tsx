import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { Alert, BodyShort } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
    errorMessage?: StringOrNothing;
}

export function EnkeltInformasjon({ header, value = EMDASH, errorMessage }: Props) {
    return (
        <span>
            <BodyShort size="small" className="body_header">
                {header}
            </BodyShort>
            {!errorMessage && (
                <BodyShort size="small" className="enkeltinfo_value">
                    {value}
                </BodyShort>
            )}
            {errorMessage && (
                <Alert variant="info" inline size="small">
                    {errorMessage}
                </Alert>
            )}
        </span>
    );
}
