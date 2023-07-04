import { Alert, Heading } from "@navikt/ds-react";
import {
    ExternalLinkIcon
} from '@navikt/aksel-icons';

export const PilotAlert = () => {
    return (
        <Alert variant="warning" className="PilotAlert">
            <Heading spacing size="small" level="3">
                Testside for Overblikk
            </Heading>
            <p>På denne siden vil det dukke opp nytt innhold fortløpende. Vi setter stor pris på dine tilbakemeldinger, som du kan gi når som helst og så mange ganger du vil via skjemaet under. Takk for at du deltar!
            </p>
            <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=NGU2YsMeYkmIaZtVNSedC82w9cYW0T9LvG_A-5MUGd9UNUZOTERKM1RINVVYTVM2Qk0wSkNJRFVLMy4u">Gi tilbakemeldinger i Forms <ExternalLinkIcon title="a11y-title" /></a>
        </Alert>
    );
};