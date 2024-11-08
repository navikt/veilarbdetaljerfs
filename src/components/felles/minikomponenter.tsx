import { Alert, Loader } from '@navikt/ds-react';
import './minikomponenter.css';

export const Laster = () => (
    <div className="midtstill">
        <Loader size="3xlarge" />
    </div>
);

type ErrormeldingProps = {
    feilkode?: string | null;
};

const defaultErrorMeldingProps: ErrormeldingProps = { feilkode: null } as const;

export const Errormelding = (props: ErrormeldingProps = defaultErrorMeldingProps) => {
    const { feilkode } = props;

    return (
        <div className="midtstill">
            <Alert variant="error" size="small">
                Noe gikk galt! Prøv igjen om noen minutter.
                {feilkode && (
                    <>
                        <br />
                        <em>Feilkode: {feilkode}.</em>
                    </>
                )}
            </Alert>
        </div>
    );
};
