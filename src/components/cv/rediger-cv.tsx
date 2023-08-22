import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';

export function RedigerCV(props: { erManuell: boolean | undefined; endreCvUrl: string }) {
    if (!props.erManuell) {
        return null;
    }

    return (
        <Link href={props.endreCvUrl} target="_blank">
            <PencilIcon title="Ikon som illustrerer en blyant som skriver" className="lenke-ikon" />
            <BodyShort size="small">Endre CV/jobbønsker</BodyShort>
        </Link>
    );
}
