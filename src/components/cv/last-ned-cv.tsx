import { logMetrikk } from '../../utils/logger';
import { DownloadIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { byggCvUrl } from '../../utils';
import { trackAmplitude } from '../../amplitude/amplitude';

export function LastNedCV(props: { erManuell: boolean | undefined; fnr?: string }) {
    const handleOnLastNedLenkeClicked = () => {
        trackAmplitude({ name: 'last ned', data: { type: 'saksdokument', tema: 'CV', tittel: 'CV' } });
        logMetrikk('veilarbdetaljerfs.metrikker.last-ned-cv', { erManuell: props.erManuell });
    };
    const lastNedCvUrl = byggCvUrl('/min-cv/pdf');

    return (
        <Link onClick={handleOnLastNedLenkeClicked} href={lastNedCvUrl} target="_blank">
            <DownloadIcon title="Ikon som illustrerer nedlasting" className="lenke-ikon" />
            <BodyShort size="small">Last ned CV</BodyShort>
        </Link>
    );
}
