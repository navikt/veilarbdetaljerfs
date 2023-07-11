import React from 'react';

import { Heading, Label } from '@navikt/ds-react';

interface Props {
    header: string;
    headerTypo?: 'ingress' | 'element';
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

function Informasjonsbolk({ header, headerTypo = 'element', children, className, icon, ...rest }: Props) {
    return (
        <div className={'informasjonsbolk'} {...rest}>
            <span className="informasjonsbolk-tittel">
                {icon}
                {headerTypo === 'ingress' && (
                    <Heading level="4" size="small">
                        {header}
                    </Heading>
                )}
                {headerTypo === 'element' && <Label size="small">{header}</Label>}
            </span>
            {children}
        </div>
    );
}

export default Informasjonsbolk;
