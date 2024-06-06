import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

interface Props {
    sporsmal: string;
    svar?: string[];
}

export const SporsmalvisningFlerSvar = ({ sporsmal, svar = [] }: Props) => {
    return (
        <div key={sporsmal}>
            <BodyShort size="small" className="body_header">
                {sporsmal}
            </BodyShort>
            {svar.length > 0 ? (
                svar.map((s, index) => (
                    <BodyShort size="small" className="enkeltinfo_value" key={index}>
                        {s ?? EMDASH}
                    </BodyShort>
                ))
            ) : (
                <BodyShort size="small" className="enkeltinfo_value">
                    {EMDASH}
                </BodyShort>
            )}
        </div>
    );
};

export const Sporsmalvisning = ({ sporsmal, svar }: { sporsmal: string; svar?: string }) => {
    return (
        <div key={sporsmal}>
            <BodyShort size="small" className="body_header">
                {sporsmal}
            </BodyShort>
            <BodyShort size="small" className="enkeltinfo_value">
                {svar ?? EMDASH}
            </BodyShort>
        </div>
    );
};
