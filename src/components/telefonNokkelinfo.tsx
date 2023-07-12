import { BodyShort, CopyButton, Heading } from '@navikt/ds-react';
import EMDASH from '../utils/emdash';
import { StringOrNothing } from '../utils/felles-typer';

interface Props {
    header: string;
    value?: StringOrNothing;
}

export function TelefonNokkelInfo({ header, value = EMDASH }: Props) {
    return (
        <BodyShort>
            <Heading level="5" size="xsmall" style={{ marginRight: '5px', marginBottom: -14 }}>
                {header}
            </Heading>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <BodyShort size="small">{value}</BodyShort>
                <CopyButton copyText={value!} />
            </div>
        </BodyShort>
    );
}
