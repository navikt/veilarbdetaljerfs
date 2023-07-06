import { Heading, Panel } from '@navikt/ds-react';
import { OrNothing } from '../../utils/felles-typer';
import { useAppStore } from '../../stores/app-store';
import { hentPersonalia } from '../../data/api/fetch';
import { useEffect, useState } from 'react';
import {
    Bostedsadresse,
    Kontaktadresse,
    Oppholdsadresse,
    PersonaliaEpost,
    PersonaliaPartner,
    PersonaliaSivilstandNy,
    PersonaliaTelefon,
    PersonaliaV2Info,
    PersonsBarn
} from '../../data/api/datatyper/personalia';
import { Errormelding, Laster } from '../felles/minikomkomponenter';
import Telefon from './telefon';
import Adresser from './adresser';
import { kalkulerAlder } from '../../utils/date-utils';
import Barn from './barn';
import Sivilstand from './sivilstand';

const PersonaliaBoks = () => {
    const { fnr } = useAppStore();

    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [personalia, setPersonalia] = useState<PersonaliaV2Info | null>(null);

    useEffect(() => {
        const hentPersonaliaData = async () => {
            try {
                setLasterData(true);
                const _personalia = await hentPersonalia(fnr);
                setPersonalia(_personalia);
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
    const kontaktadresser: Kontaktadresse[] = personalia?.kontaktadresser!;

    const MAX_ALDER_BARN = 21;
    const barn: PersonsBarn[] =
        (personalia?.barn &&
            personalia.barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN)) ||
        [];
    const filtrertBarneListe =
        barn && barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN);

    const partner: PersonaliaPartner | undefined = personalia?.partner;
    const sivilstandliste: PersonaliaSivilstandNy[] | undefinedç = personalia?.sivilstandliste;

    if (lasterData) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Errormelding />
            </Panel>
        );
    }

    return (
        <>
            <Panel border>
                <Heading spacing level="2" size="large">
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
                </span>
            </Panel>
        </>
    );
};

export default PersonaliaBoks;
