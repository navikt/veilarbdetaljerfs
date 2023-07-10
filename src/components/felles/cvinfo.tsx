import React from 'react';
import { Heading } from '@navikt/ds-react';
import '../cv/cv-innhold.css';

interface Props {
    header: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

function CvInfo(props: Props) {
    const { header, children, icon } = props;

    return (
        <div className="cv-info">
            <span className="cv-info-tittel">
                {icon}
                <Heading level="4" size="small">
                    {header}
                </Heading>
            </span>
            {children}
        </div>
    );
}

export default CvInfo;
