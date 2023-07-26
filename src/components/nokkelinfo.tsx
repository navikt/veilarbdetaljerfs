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
import { formatStringInUpperAndLowerCaseUnderscore, formaterDato, formaterTelefonnummer } from '../utils/formater';
import { kalkulerAlder } from '../utils/date-utils';
import { EnkeltInformasjonMedCopy } from './felles/enkeltInfoMedCopy';
import EMDASH from '../utils/emdash';

const Nokkelinfo = () => {
    const { fnr } = useAppStore();

    const {
        data: oppfolgingsstatusData,
        error: oppfolgingsstatusError,
        isLoading: oppfolgingsstatusLoading
    } = useOppfolgingsstatus(fnr);
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr);
    const { data: registreringData, error: registreringError, isLoading: registreringLoading } = useRegistrering(fnr);
    const { data: tolkData, error: tolkError, isLoading: tolkLoading } = useTolk(fnr);
    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);
    const {
        data: cvOgJobbonskerData,
        error: cvOgJobbonskerError,
        isLoading: cvOgJobbonskerLoading
    } = useCvOgJobbonsker(fnr);

    const {
        data: veilederData,
        error: veilederError,
        isLoading: veilederLoading
    } = useVeileder(oppfolgingsstatusData?.veilederId);

    if (
        oppfolgingsstatusLoading ||
        personLoading ||
        registreringLoading ||
        tolkLoading ||
        ytelserLoading ||
        cvOgJobbonskerLoading ||
        veilederLoading
    ) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Heading spacing level="2" size="medium">
                    Nøkkelinfo
                </Heading>
                <Laster />
            </Panel>
        );
    }
    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        registreringError?.status === 204 ||
        registreringError?.status === 404 ||
        tolkError?.status === 204 ||
        tolkError?.status === 404 ||
        ytelserError?.status === 204 ||
        ytelserError?.status === 404 ||
        cvOgJobbonskerError?.status === 204 ||
        cvOgJobbonskerError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (
        oppfolgingsstatusError ||
        personError ||
        registreringError ||
        tolkError ||
        ytelserError ||
        cvOgJobbonskerError ||
        veilederError
    ) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Heading spacing level="2" size="medium">
                    Nøkkelinfo
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    const telefon: StringOrNothing = personData?.telefon?.find((entry) => entry.prioritet === '1')?.telefonNr;
    const taletolk: OrNothing<TilrettelagtKommunikasjonData> = tolkData;
    const onsketYrkeTitles: string[] = cvOgJobbonskerData?.jobbprofil?.onsketYrke.map((yrke) => yrke.tittel) || [];
    const jobbonsker: string = onsketYrkeTitles.length > 0 ? onsketYrkeTitles.join(', ') : EMDASH;
    const sivilstatus: StringOrNothing = personData?.sivilstandliste?.[0]?.sivilstand;
    const hovedmaal: OrNothing<Hovedmal | ArenaHovedmalKode> = oppfolgingsstatusData?.hovedmaalkode;
    const registrertAv: StringOrNothing = registreringData?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const datoRegistrert: StringOrNothing = registreringData?.registrering?.opprettetDato;
    const MAX_ALDER_BARN = 21;
    const barnUnder21: PersonsBarn[] =
        (personData?.barn &&
            personData?.barn.filter(
                (enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN
            )) ||
        [];

    const barnNavn: string =
        barnUnder21.length > 0
            ? barnUnder21.map((barn) => `${barn.fornavn} (${kalkulerAlder(new Date(barn.fodselsdato))})`).join(', ')
            : EMDASH;

    return (
        <Panel border className="nokkelinfo_panel">
            <Heading spacing level="2" size="medium">
                Nøkkelinfo
            </Heading>
            <span className="nokkelinfo_container">
                <EnkeltInformasjonMedCopy header="Telefonnummer" value={formaterTelefonnummer(telefon)} />
                <EnkeltInformasjon header="Barn under 21 år" value={barnNavn} />
                <EnkeltInformasjon header="Hovedmål" value={mapHovedmalTilTekst(hovedmaal)} />
                <EnkeltInformasjon header="Registrert dato" value={formaterDato(datoRegistrert)} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                <EnkeltInformasjon header="Tilrettelagt kommunikasjon" value={hentTolkTekst(taletolk)} />
                <EnkeltInformasjon header="Sivilstand" value={formatStringInUpperAndLowerCaseUnderscore(sivilstatus)} />
                <EnkeltInformasjon header="Jobbønsker" value={jobbonsker} />
                <EnkeltInformasjon header="Registrert av" value={registrertAv} />
                <EnkeltInformasjon header="Aktive ytelse(r)" value={getVedtakForVisning(ytelserData?.vedtaksliste)} />
            </span>
        </Panel>
    );
};

export default Nokkelinfo;
