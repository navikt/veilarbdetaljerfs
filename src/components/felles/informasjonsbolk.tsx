import React from 'react';
import { BodyShort, Heading } from '@navikt/ds-react';
import '../../../index.css';

interface Props {
    header: string;
    headerTypo?: 'ingress' | 'element';
    children: React.ReactNode;
    icon?: React.ReactNode;
}

function Informasjonsbolk({ header, headerTypo = 'element', children, icon }: Props) {
    return (
        <div className="informasjonsbolk">
            <span className="informasjonsbolk-tittel">
                {icon}
                {headerTypo === 'ingress' && (
                    <Heading level="4" size="small">
                        {header}
                    </Heading>
                )}
                {headerTypo === 'element' && <BodyShort size="small">{header}</BodyShort>}
            </span>
            {children}
        </div>
    );
}

export default Informasjonsbolk;
