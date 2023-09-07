import { PencilIcon } from '@navikt/aksel-icons';
import { BodyShort, Link } from '@navikt/ds-react';
import { trackAmplitude } from '../../amplitude/amplitude';

export function RedigerCV(props: { erManuell: boolean | undefined; endreCvUrl: string }) {
    if (!props.erManuell) {
        return null;
    }

    const handleOnClick = () => {
        trackAmplitude({ name: 'navigere', data: { lenketekst: 'Endre CV/jobbønsker', destinasjon: 'Brukers CV' } });
    };

    return (
        <Link href={props.endreCvUrl} target="_blank" onClick={handleOnClick}>
            <PencilIcon title="Ikon som illustrerer en blyant som skriver" className="lenke-ikon" />
            <BodyShort size="small">Endre CV/jobbønsker</BodyShort>
        </Link>
    );
}
