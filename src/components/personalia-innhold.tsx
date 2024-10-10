import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { PersonaliaPartner, PersonaliaSivilstandNy, PersonsBarn } from '../data/api/datatyper/personalia';
import { Errormelding, Laster } from './felles/minikomponenter';
import { kalkulerAlder } from '../utils/date-utils';
import Barn from './personalia/barn';
import Sivilstand from './personalia/sivilstand';
import { VergemaalEllerFremtidsfullmakt } from '../data/api/datatyper/Verge.ts';
import Vergemaal from './personalia/vergemaal';
import FullmaktListe from './personalia/representasjon-fullmakt.tsx';
import './fellesStyling.css';
import {
    usePersonalia,
    useVergeOgFullmakt
} from '../data/api/fetch';
import Kontaktinformasjon from './personalia/kontaktinformasjon';
import LandOgSprak from './personalia/landOgSprak';
import { EndrePersonopplysninger } from './personalia/endre-personopplysninger.tsx';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';

const Personaliainnhold = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = hentBehandlingsnummer();
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr!, behandlingsnummer);
    const {
        data: vergeOgFullmaktData,
        error: vergeOgFullmaktError,
        isLoading: vergeOgFullmaktLoading
    } = useVergeOgFullmakt(fnr, behandlingsnummer);

    const MAX_ALDER_BARN = 21;
    const barn: PersonsBarn[] =
        (personData?.barn &&
            personData?.barn.filter(
                (enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN
            )) ||
        [];
    const filtrertBarneListe =
        barn && barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN);

    const partner: PersonaliaPartner | undefined = personData?.partner;
    const sivilstandliste: PersonaliaSivilstandNy[] | undefined = personData?.sivilstandliste;

    const vergemaalFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[] =
        vergeOgFullmaktData?.vergemaalEllerFremtidsfullmakt ?? [];

    if (personLoading || vergeOgFullmaktLoading) {
        return <Laster />;
    }

    if (
        personError?.status === 204 ||
        personError?.status === 404 ||
        vergeOgFullmaktError?.status === 204 ||
        vergeOgFullmaktError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (personError || vergeOgFullmaktError) {
        return <Errormelding />;
    }

    return (
        <>
            {personData?.sivilstandliste && personData?.sivilstandliste.length > 1 && (
                <Alert variant="warning" size="small" id="personalia_advarsel">
                    Det er motstridende informasjon i kildene for sivilstand. Personen bør bes om å oppdatere sin
                    sivilstand hos Folkeregisteret (https://www.skatteetaten.no/person/folkeregister/)
                </Alert>
            )}
            <span className="info_container">
                <Kontaktinformasjon />
                <Sivilstand partner={partner} sivilstandliste={sivilstandliste} />
                <Barn barn={filtrertBarneListe} />
                <LandOgSprak />
                <Vergemaal vergemaalEllerFremtidsfullmakt={vergemaalFremtidsfullmakt} />
                <FullmaktListe />
            </span>
            <EndrePersonopplysninger fnr={fnr} />
        </>
    );
};

export default Personaliainnhold;
