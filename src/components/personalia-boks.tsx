import { Heading, Panel } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { PersonaliaPartner, PersonaliaSivilstandNy, PersonsBarn } from '../data/api/datatyper/personalia';
import { Errormelding, Laster } from './felles/minikomponenter';
import { kalkulerAlder } from '../utils/date-utils';
import Barn from './personalia/barn';
import Sivilstand from './personalia/sivilstand';
import { Fullmakter, VergemaalEllerFremtidsfullmakt } from '../data/api/datatyper/vergeOgFullmakt';
import Vergemaal from './personalia/vergemaal';
import Fullmakt from './personalia/fullmakt';
import './fellesStyling.css';
import { usePersonalia, useVergeOgFullmakt } from '../data/api/fetch';
import Kontaktinformasjon from './personalia/kontakinformasjon';
import LandOgSprak from './personalia/landOgSprak';

const PersonaliaBoks = () => {
    const { fnr } = useAppStore();

    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr);
    const {
        data: vergeOgFullmaktData,
        error: vergeOgFullmaktError,
        isLoading: vergeOgFullmaktLoading
    } = useVergeOgFullmakt(fnr);

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
    const fullmakt: Fullmakter[] = vergeOgFullmaktData?.fullmakt ?? [];

    if (personLoading || vergeOgFullmaktLoading) {
        return (
            <Panel border className="info_panel" tabIndex={4}>
                <Laster />
            </Panel>
        );
    }

    if (
        personError?.status === 204 ||
        personError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (personError || vergeOgFullmaktError) {
        return (
            <Panel border className="info_panel" tabIndex={4}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Personalia
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel" tabIndex={4}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Personalia
            </Heading>
            <span className="info_container">
                <Kontaktinformasjon />
                <Sivilstand partner={partner} sivilstandliste={sivilstandliste} />
                <Barn barn={filtrertBarneListe} />
                <LandOgSprak />
                <Vergemaal vergemaalEllerFremtidsfullmakt={vergemaalFremtidsfullmakt} />
                <Fullmakt fullmakt={fullmakt} />
            </span>
        </Panel>
    );
};

export default PersonaliaBoks;
