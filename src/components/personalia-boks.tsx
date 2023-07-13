import { Heading, Panel } from '@navikt/ds-react';
import { OrNothing } from '../utils/felles-typer';
import { useAppStore } from '../stores/app-store';
import { hentPersonalia, hentTolk, hentVergeOgFullmakt } from '../data/api/fetch';
import { useEffect, useState } from 'react';
import {
    Bostedsadresse,
    Kontaktadresse,
    Oppholdsadresse,
    PersonaliaPartner,
    PersonaliaSivilstandNy,
    PersonaliaTelefon,
    PersonaliaV2Info,
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
import { Fullmakter, VergeOgFullmaktData, VergemaalEllerFremtidsfullmakt } from '../data/api/datatyper/vergeOgFullmakt';
import Vergemaal from './personalia/vergemaal';
import Fullmakt from './personalia/fullmakt';
import './fellesStyling.css';

const PersonaliaBoks = () => {
    const { fnr } = useAppStore();

    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [personalia, setPersonalia] = useState<PersonaliaV2Info | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);
    const [vergeOgFullmakt, setVergeOgFullmakt] = useState<VergeOgFullmaktData | null>(null);

    useEffect(() => {
        const hentPersonaliaData = async () => {
            try {
                setLasterData(true);
                const [_personalia, _tolk, _vergeOgFullmakt] = await Promise.all([
                    hentPersonalia(fnr),
                    hentTolk(fnr),
                    hentVergeOgFullmakt(fnr)
                ]);

                setPersonalia(_personalia);
                setTolk(_tolk);
                setVergeOgFullmakt(_vergeOgFullmakt);
            } catch (err) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentPersonaliaData();
    }, [fnr]);

    const bostedsadresse: OrNothing<Bostedsadresse> = personalia?.bostedsadresse;
    const telefon: PersonaliaTelefon[] = personalia?.telefon!;
    const oppholdsadresse: OrNothing<Oppholdsadresse> = personalia?.oppholdsadresse;
    const kontaktadresser: Kontaktadresse[] = personalia?.kontaktadresser ?? [];

    const MAX_ALDER_BARN = 21;
    const barn: PersonsBarn[] =
        (personalia?.barn &&
            personalia.barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN)) ||
        [];
    const filtrertBarneListe =
        barn && barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN);

    const partner: PersonaliaPartner | undefined = personalia?.partner;
    const sivilstandliste: PersonaliaSivilstandNy[] | undefined = personalia?.sivilstandliste;
    const statsborgerskap: string[] = personalia?.statsborgerskap ?? [];
    const tilrettelagtKommunikasjon: OrNothing<TilrettelagtKommunikasjonData> = tolk;
    const maalform: OrNothing<String> = personalia?.malform;
    const vergemaalFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[] =
        vergeOgFullmakt?.vergemaalEllerFremtidsfullmakt ?? [];
    const fullmakt: Fullmakter[] = vergeOgFullmakt?.fullmakt ?? [];

    if (lasterData) {
        return (
            <Panel border className="info_panel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="info_panel">
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel">
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
                <Barn barn={filtrertBarneListe} />
                <Sivilstand partner={partner} sivilstandliste={sivilstandliste} />
                <StatsborgerskapInfo statsborgerskapData={statsborgerskap} />
                <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={tilrettelagtKommunikasjon} />
                <EnkeltInformasjon header="Målform" value={hentMalform(maalform)} />
                <div>
                    <Vergemaal vergemaalEllerFremtidsfullmakt={vergemaalFremtidsfullmakt} />
                    <Fullmakt fullmakt={fullmakt} />
                </div>
            </span>
        </Panel>
    );
};

export default PersonaliaBoks;
