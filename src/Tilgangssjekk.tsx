import { ReactNode } from 'react';
import { Alert } from '@navikt/ds-react';
import { useHarTilgangTilBruker, useUnderOppfolging } from './data/api/fetch.ts';
import { Laster } from './components/felles/minikomponenter.tsx';

export const Tilgangssjekk = ({ fnr, children }: { fnr?: string; children: ReactNode }) => {
    const {
        data: underOppfolging,
        isLoading: loadingIsUnderOppfolging,
        error: errorIsUnderOppfolging
    } = useUnderOppfolging(fnr);
    const {
        data: harTilgangTilBruker,
        isLoading: loadingHarTilgangTilBruker,
        error: errorHarTilgangTilBruker
    } = useHarTilgangTilBruker(fnr);

    if (loadingIsUnderOppfolging || loadingHarTilgangTilBruker) {
        return <Laster />;
    }

    if (errorIsUnderOppfolging || errorHarTilgangTilBruker) {
        return (
            <Alert size="medium" variant="error" className="midtstill">
                Noe gikk galt, og vi kan ikke sjekke om du har nødvendige tilganger til å se informasjon om personen.
                Prøv igjen senere.
            </Alert>
        );
    }

    if (!harTilgangTilBruker) {
        return (
            <Alert size="medium" variant="warning" className="midtstill">
                Du har ikke de nødvendige tilgangene til å se informasjon om personen.
            </Alert>
        );
    }

    if (!underOppfolging?.underOppfolging) {
        return (
            <Alert size="medium" variant="warning" className="midtstill">
                Personen har ikke arbeidsrettet oppfølging, og du kan derfor ikke se informasjon om personen.
            </Alert>
        );
    }

    return <>{children}</>;
};
