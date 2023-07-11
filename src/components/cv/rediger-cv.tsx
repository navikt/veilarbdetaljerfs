import { PencilWritingIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';

export function RedigerCV(props: { erManuell: boolean | undefined; cvRegistreringsLenke: string }) {
    if (!props.erManuell) {
        return null;
    }

    return (
        <Link href={props.cvRegistreringsLenke} target="_blank">
            <PencilWritingIcon />
            Endre CV/jobbønsker
        </Link>
    );
}
