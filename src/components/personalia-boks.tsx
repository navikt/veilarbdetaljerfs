import { Heading, Panel } from '@navikt/ds-react';
import { OrNothing } from '../utils/felles-typer';
import { useAppStore } from '../stores/app-store';
import {
    Bostedsadresse,
    Kontaktadresse,
    Oppholdsadresse,
    PersonaliaPartner,
    PersonaliaSivilstandNy,
    PersonaliaTelefon,
    PersonsBarn
} from '../data/api/datatyper/personalia';
import { Errormelding, Laster } from './felles/minikomponenter';
import Telefon from './personalia/telefon';
import Adresser from './personalia/adresser';
import { kalkulerAlder } from '../utils/date-utils';
import Barn from './personalia/barn';
import Sivilstand from './personalia/sivilstand';
import StatsborgerskapInfo from './personalia/statsborgerskapinfo';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import TilrettelagtKommunikasjon from './personalia/tilrettelagtKommunikasjon';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { hentMalform } from '../utils/konstanter';
import { Fullmakter, VergemaalEllerFremtidsfullmakt } from '../data/api/datatyper/vergeOgFullmakt';
import Vergemaal from './personalia/vergemaal';
import Fullmakt from './personalia/fullmakt';
import './fellesStyling.css';
import { usePersonalia, useTolk, useVergeOgFullmakt } from '../data/api/fetch';

const PersonaliaBoks = () => {
    const { fnr } = useAppStore();

    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr);
    const { data: tolkData, error: tolkError, isLoading: tolkLoading } = useTolk(fnr);
    const {
        data: vergeOgFullmaktData,
        error: vergeOgFullmaktError,
        isLoading: vergeOgFullmaktLoading
    } = useVergeOgFullmakt(fnr);

    const bostedsadresse: OrNothing<Bostedsadresse> = personData?.bostedsadresse;
    const telefon: PersonaliaTelefon[] = personData?.telefon!;
    const oppholdsadresse: OrNothing<Oppholdsadresse> = personData?.oppholdsadresse;
    const kontaktadresser: Kontaktadresse[] = personData?.kontaktadresser ?? [];

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
    const statsborgerskap: string[] = personData?.statsborgerskap ?? [];
    const tilrettelagtKommunikasjon: OrNothing<TilrettelagtKommunikasjonData> = tolkData;
    const maalform: OrNothing<String> = personData?.malform;
    const vergemaalFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[] =
        vergeOgFullmaktData?.vergemaalEllerFremtidsfullmakt ?? [];
    const fullmakt: Fullmakter[] = vergeOgFullmaktData?.fullmakt ?? [];

    if (personLoading || tolkLoading || vergeOgFullmaktLoading) {
        return (
            <Panel border className="info_panel" tabIndex={4}>
                <Laster />
            </Panel>
        );
    }

    if (
        tolkError?.status === 204 ||
        tolkError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (personError || tolkError || vergeOgFullmaktError) {
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
                <Telefon telefon={telefon} />
                <Adresser
                    bostedsadresse={bostedsadresse}
                    oppholdsadresse={oppholdsadresse}
                    kontaktadresser={kontaktadresser}
                />
                <StatsborgerskapInfo statsborgerskapData={statsborgerskap} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={tilrettelagtKommunikasjon} />
                <Barn barn={filtrertBarneListe} />
                <Sivilstand partner={partner} sivilstandliste={sivilstandliste} />
                <div>
                    <Vergemaal vergemaalEllerFremtidsfullmakt={vergemaalFremtidsfullmakt} />
                    <Fullmakt fullmakt={fullmakt} />
                </div>
                <EnkeltInformasjon header="Målform" value={hentMalform(maalform)} />
            </span>
        </Panel>
    );
};

export default PersonaliaBoks;
