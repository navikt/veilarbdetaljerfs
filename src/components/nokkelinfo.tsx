import { Heading, Panel } from '@navikt/ds-react';
import { Laster, Errormelding } from './felles/minikomponenter';
import './nokkelinfo.css';
import { VeilederData } from '../data/api/datatyper/veileder';
import { useAppStore } from '../stores/app-store';
import {
    hentOppfolgingsstatus,
    hentPersonalia,
    hentRegistrering,
    hentTolk,
    hentVeileder,
    hentYtelser,
    hentCvOgJobbonsker
} from '../data/api/fetch';
import { OppfolgingsstatusData, ArenaHovedmalKode } from '../data/api/datatyper/oppfolgingsstatus';
import { useEffect, useState } from 'react';
import { PersonaliaV2Info, PersonsBarn } from '../data/api/datatyper/personalia';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { YtelseData } from '../data/api/datatyper/ytelse';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { getVedtakForVisning, hentTolkTekst, hentVeilederTekst, mapHovedmalTilTekst } from '../utils/text-mapper';
import { Hovedmal } from '../data/api/datatyper/siste14aVedtak';
import { formaterDato, formaterTelefonnummer } from '../utils/formater';
import { ArenaPerson } from '../data/api/datatyper/arenaperson';
import { kalkulerAlder } from '../utils/date-utils';
import { EnkeltInformasjonMedCopy } from './felles/enkeltInfoMedCopy';

const Nokkelinfo = () => {
    const { fnr } = useAppStore();

    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    const [veileder, setVeileder] = useState<VeilederData | null>(null);
    const [oppfolgingsstatus, setOppfolgingsstatus] = useState<OppfolgingsstatusData | null>(null);
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);
    const [cvOgJobbonsker, setCvOgJobbonsker] = useState<ArenaPerson | null>(null);

    useEffect(() => {
        const hentOverblikkData = async () => {
            try {
                setLasterData(true);
                const [_oppfolgingsstatus, _personalia, _registrering, _tolk, _ytelser, _cvOgJobbonsker] =
                    await Promise.all([
                        hentOppfolgingsstatus(fnr),
                        hentPersonalia(fnr),
                        hentRegistrering(fnr),
                        hentTolk(fnr),
                        hentYtelser(fnr),
                        hentCvOgJobbonsker(fnr)
                    ]);

                if (_oppfolgingsstatus !== null && _oppfolgingsstatus?.veilederId !== null) {
                    const _veileder = await hentVeileder(_oppfolgingsstatus.veilederId);
                    setVeileder(_veileder);
                }

                setOppfolgingsstatus(_oppfolgingsstatus);
                setPerson(_personalia);
                setRegistrering(_registrering);
                setTolk(_tolk);
                setYtelser(_ytelser);
                setCvOgJobbonsker(_cvOgJobbonsker);
            } catch (err) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentOverblikkData();
    }, [fnr]);

    const telefon: StringOrNothing = person?.telefon?.find((entry) => entry.prioritet === '1')?.telefonNr;
    const taletolk: OrNothing<TilrettelagtKommunikasjonData> = tolk;
    const onsketYrkeTitles: string[] = cvOgJobbonsker?.jobbprofil?.onsketYrke.map((yrke) => yrke.tittel) || [];
    const sivilstatus: StringOrNothing = person?.sivilstandliste?.[0]?.sivilstand;
    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatus?.hovedmaalkode;
    const registrertAv: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;
    const MAX_ALDER_BARN = 21;
    const barnUnder21: PersonsBarn[] =
        (person?.barn &&
            person.barn.filter((enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN)) ||
        [];

    const barnNavn: string = barnUnder21
        .map((barn) => `${barn.fornavn} (${kalkulerAlder(new Date(barn.fodselsdato))})`)
        .join(', ');

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
            <Panel border className="nokkelinfo_panel">
                <Heading spacing level="2" size="large">
                    Nøkkelinfo
                </Heading>
                <span className="nokkelinfo_container">
                    <EnkeltInformasjonMedCopy header="Telefonnummer" value={formaterTelefonnummer(telefon)} />
                    <EnkeltInformasjon header="Barn under 21 år" value={barnNavn} />
                    <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                    <EnkeltInformasjon header="Registrert dato" value={formaterDato(datoRegistrert)} />
                    <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veileder)} />
                    <EnkeltInformasjon header="Tilrettelagt kommunikasjon" value={hentTolkTekst(taletolk)} />
                    <EnkeltInformasjon header="Sivilstand" value={sivilstatus} />
                    <EnkeltInformasjon header="Jobbønsker" value={onsketYrkeTitles.join(', ')} />
                    <EnkeltInformasjon header="Registrert av" value={registrertAv} />
                    <EnkeltInformasjon header="Aktive ytelse(r)" value={getVedtakForVisning(ytelser?.vedtaksliste)} />
                </span>
            </Panel>
        </>
    );
};

export default Nokkelinfo;
