import { logMetrikk } from '../../utils/logger';
import { DownloadIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { byggPamUrl } from '../../utils';

export function LastNedCV(props: { erManuell: boolean | undefined; fnr: string }) {
    const handleOnLastNedLenkeClicked = () => {
        logMetrikk('veilarbdetaljerfs.metrikker.last-ned-cv', { erManuell: props.erManuell });
    };
    const lastNedCvUrl = byggPamUrl(props.fnr, '/cv/pdf');

    return (
        <Link onClick={handleOnLastNedLenkeClicked} href={lastNedCvUrl} target="_blank">
            <DownloadIcon title="Ikon som illustrerer nedlasting" className="lenke-ikon" />
            <BodyShort size="small">Last ned CV</BodyShort>
        </Link>
    );
}
