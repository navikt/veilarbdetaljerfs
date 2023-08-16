import { PencilWritingIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';

export function RedigerCV(props: { erManuell: boolean | undefined; endreCvUrl: string }) {
    if (!props.erManuell) {
        return null;
    }

    return (
        <Link href={props.endreCvUrl} target="_blank">
            <PencilWritingIcon title="Ikon som illustrerer en blyant som skriver" />
            Endre CV/jobbønsker
        </Link>
    );
}
