import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { Alert, BodyShort } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    header: string;
    value?: StringOrNothing;
    errorMessage?: StringOrNothing;
    tilleggsinfo?: StringOrNothing;
    lenkeinfo?: ReactNode;
}

export function EnkeltInformasjon({ header, value = EMDASH, errorMessage, tilleggsinfo, lenkeinfo }: Props) {
    return (
        <span>
            <BodyShort size="small" className="body_header">
                {header}
            </BodyShort>
            {!errorMessage && (
                <BodyShort size="small" className="enkeltinfo_value">
                    {value}
                    {tilleggsinfo && <i>{'\n' + tilleggsinfo}</i>}
                </BodyShort>
            )}
            {errorMessage && (
                <Alert variant="info" inline size="small">
                    {errorMessage}
                </Alert>
            )}
            {lenkeinfo}
        </span>
    );
}
