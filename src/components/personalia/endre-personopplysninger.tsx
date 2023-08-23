import { Link } from '@navikt/ds-react';
import {lagPersonforvalterLenke} from '../../utils';
import {useAktorId} from "../../data/api/fetch.ts";

export function EndrePersonopplysninger(props: { fnr: string }) {
    //const handleOnLastNedLenkeClicked = () => {
    //    logMetrikk('veilarbdetaljerfs.metrikker.last-ned-cv', { erManuell: props.erManuell });
    //};
    //onClick={handleOnLastNedLenkeClicked}
    const aktorId = useAktorId(props.fnr);
    const aktorIdString = aktorId.data?.aktorId;
    const pdlWebUrl = () => {
    if (aktorIdString == undefined) {
        return "";
    }else{
        return lagPersonforvalterLenke(aktorIdString);
    }};

    return (
        <Link  href={pdlWebUrl()} target="_blank">
            Endre personopplysninger
        </Link>
    );
}
