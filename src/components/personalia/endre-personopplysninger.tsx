import {BodyShort, Link} from '@navikt/ds-react';
import {lagPersonforvalterLenke} from '../../utils';
import {useAktorId} from '../../data/api/fetch.ts';
import {ExternalLinkIcon} from '@navikt/aksel-icons';

export function EndrePersonopplysninger(props: { fnr: string }) {
    const aktorId = useAktorId(props.fnr);
    const pdlWebUrl = aktorId.data?.aktorId ? lagPersonforvalterLenke(aktorId.data?.aktorId) : '';

    return (
        <Link href={pdlWebUrl} target="_blank" className="personopplysningslenke">
            <BodyShort size="small"> Endre personopplysninger </BodyShort>
            <ExternalLinkIcon title="Ikon som illustrerer at man åpner en ny fane"/>
        </Link>
    );
}
