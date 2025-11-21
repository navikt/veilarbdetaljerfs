import { lagModiaPersonoversiktLenke } from '../utils';
import { BodyShort, Link } from '@navikt/ds-react';
import { ExternalLinkIcon } from '@navikt/aksel-icons';

export function ModiaPersonoversiktLenke() {
    const modiaPersonoversiktLenke = lagModiaPersonoversiktLenke();
    return (
        <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
            <span>
                <BodyShort size="small">
                    Se Modia personoversikt for ytelser i Kelvin og Tiltakspenger (TPSAK).
                    <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane" />
                </BodyShort>
            </span>
        </Link>
    );
}
