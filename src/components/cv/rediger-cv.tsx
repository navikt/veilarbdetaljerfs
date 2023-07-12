import { PencilWritingIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';
import { byggPamUrl } from '../../utils';

export function RedigerCV(props: { erManuell: boolean | undefined; fnr: string }) {
    if (!props.erManuell) {
        return null;
    }
    const endreCvUrl = byggPamUrl(props.fnr);

    return (
        <Link href={endreCvUrl} target="_blank">
            <PencilWritingIcon />
            Endre CV/jobbønsker
        </Link>
    );
}
