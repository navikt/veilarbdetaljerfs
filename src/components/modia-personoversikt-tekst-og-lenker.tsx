import { lagModiaPersonoversiktUtbetalingsLenke, lagModiaPersonoversiktYtelserLenke } from '../utils';
import { Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export function ModiaPersonoversiktTekstMedLenker() {
    return (
        <>
            Se Modia personoversikt for <ModiaPersonoversiktYtelserLenke />, eller for{' '}
            <ModiaPersonoversiktUtbetalingsLenke />.
        </>
    );
}

export function ModiaPersonoversiktYtelserLenke() {
    const modiaPersonoversiktLenke = lagModiaPersonoversiktYtelserLenke();
    return (
        <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
            oversikt over ytelser
            <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane" />
        </Link>
    );
}

export function ModiaPersonoversiktUtbetalingsLenke() {
    const modiaPersonoversiktLenke = lagModiaPersonoversiktUtbetalingsLenke();
    return (
        <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
            informasjon om utbetalinger
            <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane" />
        </Link>
    );
}
