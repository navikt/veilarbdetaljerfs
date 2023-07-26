import EMDASH from '../../utils/emdash';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    header: string;
    values?: StringOrNothing[];
}

export function DobbeltInformasjon({ header, values = [] }: Props) {
    const renderedValues = values.length > 0 ? values : [EMDASH];
    return (
        <span>
            <BodyShort size="small" className="body_header">
                {header}
            </BodyShort>
            <span>
                {renderedValues.map((value, index) => (
                    <BodyShort key={index} size="small">
                        {value}
                    </BodyShort>
                ))}
            </span>
        </span>
    );
}
