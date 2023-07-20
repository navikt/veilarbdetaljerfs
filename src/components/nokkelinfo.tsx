import { Heading, Panel } from '@navikt/ds-react';
import { Laster, Errormelding } from './felles/minikomponenter';
import './nokkelinfo.css';
import { useAppStore } from '../stores/app-store';
import {
    useOppfolgingsstatus,
    usePersonalia,
    useRegistrering,
    useTolk,
    useVeileder,
    useYtelser,
    useCvOgJobbonsker
} from '../data/api/fetch';
import { ArenaHovedmalKode } from '../data/api/datatyper/oppfolgingsstatus';
import { PersonsBarn } from '../data/api/datatyper/personalia';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { getVedtakForVisning, hentTolkTekst, hentVeilederTekst, mapHovedmalTilTekst } from '../utils/text-mapper';
import { Hovedmal } from '../data/api/datatyper/siste14aVedtak';
import { formaterDato, formaterTelefonnummer } from '../utils/formater';
import { kalkulerAlder } from '../utils/date-utils';
import { EnkeltInformasjonMedCopy } from './felles/enkeltInfoMedCopy';

const Nokkelinfo = () => {
    const { fnr } = useAppStore();

    const oppfolgingsstatus = useOppfolgingsstatus(fnr);
    const person = usePersonalia(fnr);
    const registrering = useRegistrering(fnr);
    const tolk = useTolk(fnr);
    const ytelser = useYtelser(fnr);
    const cvOgJobbonsker = useCvOgJobbonsker(fnr);

    // CONDITIONAL FETCH PÅ EN BEDRE MÅTE? SJEKK CONDITIONAL FETCHING I SWR DOCS
    const veileder = useVeileder(oppfolgingsstatus.data?.veilederId ? oppfolgingsstatus.data.veilederId : null);
    if (
        oppfolgingsstatus.isLoading ||
        person.isLoading ||
        registrering.isLoading ||
        tolk.isLoading ||
        ytelser.isLoading ||
        cvOgJobbonsker.isLoading ||
        veileder.isLoading
    ) {
        return (
            <Panel border className="nokkelinfo_panel" tabIndex={1}>
                <Laster />
            </Panel>
        );
    }
    if (
        oppfolgingsstatus?.error?.status === 204 ||
        oppfolgingsstatus?.error?.status === 404 ||
        person?.error?.status === 204 ||
        person?.error?.status === 404 ||
        registrering?.error?.status === 204 ||
        registrering?.error?.status === 404 ||
        tolk?.error?.status === 204 ||
        tolk?.error?.status === 404 ||
        ytelser?.error?.status === 204 ||
        ytelser?.error?.status === 404 ||
        cvOgJobbonsker?.error?.status === 204 ||
        cvOgJobbonsker?.error?.status === 404 ||
        veileder?.error?.status === 204 ||
        veileder?.error?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (
        oppfolgingsstatus.error ||
        person.error ||
        registrering.error ||
        tolk.error ||
        ytelser.error ||
        cvOgJobbonsker.error ||
        veileder.error
    ) {
        return (
            <Panel border className="nokkelinfo_panel" tabIndex={1}>
                <Heading spacing level="2" size="medium">
                    Nøkkelinfo
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const telefon: StringOrNothing = person?.data?.telefon?.find((entry) => entry.prioritet === '1')?.telefonNr;
    const taletolk: OrNothing<TilrettelagtKommunikasjonData> = tolk?.data;
    const onsketYrkeTitles: string[] = cvOgJobbonsker?.data?.jobbprofil?.onsketYrke.map((yrke) => yrke.tittel) || [];
    const sivilstatus: StringOrNothing = person?.data?.sivilstandliste?.[0]?.sivilstand;
    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatus?.data?.hovedmaalkode;
    const registrertAv: StringOrNothing = registrering?.data?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const datoRegistrert: StringOrNothing = registrering?.data?.registrering?.opprettetDato;
    const MAX_ALDER_BARN = 21;
    const barnUnder21: PersonsBarn[] =
        (person?.data?.barn &&
            person.data?.barn.filter(
                (enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN
            )) ||
        [];

    const barnNavn: string = barnUnder21
        .map((barn) => `${barn.fornavn} (${kalkulerAlder(new Date(barn.fodselsdato))})`)
        .join(', ');

    return (
        <Panel border className="nokkelinfo_panel" tabIndex={1}>
            <Heading spacing level="2" size="medium">
                Nøkkelinfo
            </Heading>
            <span className="nokkelinfo_container">
                <EnkeltInformasjonMedCopy header="Telefonnummer" value={formaterTelefonnummer(telefon)} />
                <EnkeltInformasjon header="Barn under 21 år" value={barnNavn} />
                <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                <EnkeltInformasjon header="Registrert dato" value={formaterDato(datoRegistrert)} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veileder?.data)} />
                <EnkeltInformasjon header="Tilrettelagt kommunikasjon" value={hentTolkTekst(taletolk)} />
                <EnkeltInformasjon header="Sivilstand" value={sivilstatus} />
                <EnkeltInformasjon header="Jobbønsker" value={onsketYrkeTitles.join(', ')} />
                <EnkeltInformasjon header="Registrert av" value={registrertAv} />
                <EnkeltInformasjon header="Aktive ytelse(r)" value={getVedtakForVisning(ytelser?.data?.vedtaksliste)} />
            </span>
        </Panel>
    );
};

export default Nokkelinfo;
