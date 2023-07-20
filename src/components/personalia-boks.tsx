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

    const personalia = usePersonalia(fnr);
    const tolk = useTolk(fnr);
    const vergeOgFullmakt = useVergeOgFullmakt(fnr);

    const bostedsadresse: OrNothing<Bostedsadresse> = personalia?.data?.bostedsadresse;
    const telefon: PersonaliaTelefon[] = personalia?.data?.telefon!;
    const oppholdsadresse: OrNothing<Oppholdsadresse> = personalia?.data?.oppholdsadresse;
    const kontaktadresser: Kontaktadresse[] = personalia?.data?.kontaktadresser ?? [];

    const MAX_ALDER_BARN = 21;
    const barn: PersonsBarn[] =
        (personalia?.data?.barn &&
            personalia.data?.barn.filter(
                (enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN
            )) ||
        [];
    const filtrertBarneListe =
        barn && barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN);

    const partner: PersonaliaPartner | undefined = personalia?.data?.partner;
    const sivilstandliste: PersonaliaSivilstandNy[] | undefined = personalia?.data?.sivilstandliste;
    const statsborgerskap: string[] = personalia?.data?.statsborgerskap ?? [];
    const tilrettelagtKommunikasjon: OrNothing<TilrettelagtKommunikasjonData> = tolk?.data;
    const maalform: OrNothing<String> = personalia?.data?.malform;
    const vergemaalFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[] =
        vergeOgFullmakt?.data?.vergemaalEllerFremtidsfullmakt ?? [];
    const fullmakt: Fullmakter[] = vergeOgFullmakt?.data?.fullmakt ?? [];

    if (personalia.isLoading || tolk.isLoading || vergeOgFullmakt.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={4}>
                <Laster />
            </Panel>
        );
    }

    if (tolk?.error?.status === 204 || tolk?.error?.status === 404) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (personalia.error || tolk.error || vergeOgFullmakt.error) {
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
