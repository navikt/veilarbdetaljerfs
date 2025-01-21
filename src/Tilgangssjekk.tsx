import { ReactNode } from 'react';
import { useHarTilgangTilBruker, useUnderOppfolging } from './data/api/fetch.ts';
import { Laster, MidtstiltMelding } from './components/felles/minikomponenter.tsx';

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
            <MidtstiltMelding
                size="medium"
                variant="error"
                text="Noe gikk galt, og vi kan ikke sjekke om du har nødvendige tilganger til å se informasjon om personen. Prøv igjen senere."
            />
        );
    }

    if (!harTilgangTilBruker) {
        return (
            <MidtstiltMelding
                size="medium"
                variant="warning"
                text="Du har ikke de nødvendige tilganger til å se informasjon om personen."
            />
        );
    }

    if (!underOppfolging?.underOppfolging) {
        return (
            <MidtstiltMelding
                size="medium"
                variant="warning"
                text="Personen har ikke arbeidsrettet oppfølging, og du kan derfor ikke se informasjon om personen"
            />
        );
    }

    return <>{children}</>;
};
