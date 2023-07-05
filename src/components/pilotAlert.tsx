import { Alert, Heading } from "@navikt/ds-react";
import {
    ExternalLinkIcon
} from '@navikt/aksel-icons';

export const PilotAlert = () => {
    return (
        <Alert variant="warning" className="pilot_alert">
            <Heading spacing size="small" level="3">
                Testside for Overblikk
            </Heading>
            <p>På denne siden vil det dukke opp nytt innhold fortløpende. Vi setter stor pris på dine tilbakemeldinger, som du kan gi når som helst og så mange ganger du vil via skjemaet under. Takk for at du deltar!
            </p>
            <a href="https://forms.office.com/e/xkbbUv07y0">Gi tilbakemeldinger i Forms <ExternalLinkIcon title="a11y-title" /></a>
        </Alert>
    );
};