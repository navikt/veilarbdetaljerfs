import { logMetrikk } from '../../utils/logger';
import { DownloadIcon } from '@navikt/aksel-icons';
import { Link } from '@navikt/ds-react';

export function LastNedCV(props: { erManuell: boolean | undefined; lastNedCvLenke: string }) {
    const handleOnLastNedLenkeClicked = () => {
        logMetrikk('veilarbmaofs.metrikker.last-ned-cv', { erManuell: props.erManuell });
    };

    return (
        <Link onClick={handleOnLastNedLenkeClicked} href={props.lastNedCvLenke} target="_blank">
            <DownloadIcon />
            Last ned CV
        </Link>
    );
}
