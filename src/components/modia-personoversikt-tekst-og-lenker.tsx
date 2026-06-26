import { lagModiaPersonoversiktUtbetalingsLenke, lagModiaPersonoversiktYtelserLenke } from '../utils';
import { BodyShort, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export function ModiaPersonoversiktTekstMedLenker() {
    return (
        <BodyShort size="small">
            Se Modia personoversikt for <ModiaPersonoversiktYtelserLenke />, eller for{' '}
            <ModiaPersonoversiktUtbetalingsLenke />.
        </BodyShort>
    );
}

export function ModiaPersonoversiktYtelserLenke() {
    const modiaPersonoversiktLenke = lagModiaPersonoversiktYtelserLenke();
    return (
        <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
            <span>
                <BodyShort size="small">
                    oversikt over ytelser
                    <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane" />
                </BodyShort>
            </span>
        </Link>
    );
}

export function ModiaPersonoversiktUtbetalingsLenke() {
    const modiaPersonoversiktLenke = lagModiaPersonoversiktUtbetalingsLenke();
    return (
        <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
            <span>
                <BodyShort size="small">
                    informasjon om utbetalinger
                    <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane" />
                </BodyShort>
            </span>
        </Link>
    );
}
