import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { Alert, BodyShort } from '@navikt/ds-react';

interface Props {
    header: string;
    value?: StringOrNothing;
    errorMessage?: StringOrNothing;
    tilleggsinfo?: StringOrNothing;
}

export function EnkeltInformasjon({ header, value = EMDASH, errorMessage, tilleggsinfo }: Props) {
    return (
        <span>
            <BodyShort size="small" className="body_header">
                {header}
            </BodyShort>
            {!errorMessage && (
                <BodyShort size="small" className="enkeltinfo_value">
                    {value}
                    {tilleggsinfo && <i className="enkeltinfo_value_tillegsinfo">{tilleggsinfo}</i>}
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
