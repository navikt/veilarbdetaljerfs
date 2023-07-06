import '../info.css';
import { StringOrNothing } from '../../utils/felles-typer';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    header: string;
    values?: StringOrNothing[];
    children?: React.ReactNode;
}
export function DobbeltInformasjon(props: Props) {
    return (
        <span>
            <Heading level="5" size="xsmall">{props.header}:</Heading>
            <span>{props.values?.map((value, index) => (
                <BodyShort key={index} size="small">
                    {value}
                </BodyShort>
            ))}</span>
            {props.children}
        </span>
    );
}


