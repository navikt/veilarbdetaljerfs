import { Errormelding, Laster } from './felles/minikomponenter';
import { useAppStore } from '../stores/app-store';
import { ArenaServicegruppeKode } from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import {
    hentGeografiskEnhetTekst,
    hentOppfolgingsEnhetTekst,
    hentVeilederTekst,
    mapServicegruppeTilTekst
} from '../utils/text-mapper';
import {
    Siste14aVedtak,
    useGjeldendeOppfolgingsperiode,
    useOppfolgingsstatus,
    usePersonalia,
    useSiste14aVedtak,
    useVeileder
} from '../data/api/fetch';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';
import { sjekkOmSiste14aVedtakErGjeldende } from '../utils/gjeldende-14a-vetak.ts';

const Oppfolgingsinnhold = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = hentBehandlingsnummer();
    const {
        data: oppfolgingsstatusData,
        error: oppfolgingsstatusError,
        isLoading: oppfolgingsstatusLoading
    } = useOppfolgingsstatus(fnr);
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr!, behandlingsnummer);
    const {
        data: veilederData,
        error: veilederError,
        isLoading: veilederLoading
    } = useVeileder(oppfolgingsstatusData?.veilederId);

    const {
        data: siste14avedtak,
        error: siste14avedtakError,
        isLoading: siste14avedtakLoading
    } = useSiste14aVedtak(fnr);
    const {
        data: gjeldendeOppfolgingsperiode,
        error: gjeldendeOppfolgingsperiodeError,
        isLoading: gjeldendeOppfolgingsperiodeLoading
    } = useGjeldendeOppfolgingsperiode(fnr);
    const gjeldende14aVedtak: OrNothing<Siste14aVedtak> = sjekkOmSiste14aVedtakErGjeldende(
        siste14avedtak,
        gjeldendeOppfolgingsperiode
    )
        ? siste14avedtak
        : null;

    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;

    if (
        oppfolgingsstatusLoading ||
        personLoading ||
        veilederLoading ||
        siste14avedtakLoading ||
        gjeldendeOppfolgingsperiodeLoading
    ) {
        return <Laster />;
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404 ||
        siste14avedtakError?.status === 204 ||
        siste14avedtakError?.status === 404 ||
        gjeldendeOppfolgingsperiodeError?.status === 204 ||
        gjeldendeOppfolgingsperiodeError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (
        oppfolgingsstatusError ||
        personError ||
        veilederError ||
        siste14avedtakError ||
        gjeldendeOppfolgingsperiodeError
    ) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsstatusData)} />
                <InnsatsGruppe
                    innsatsgruppe={gjeldende14aVedtak?.innsatsgruppe}
                    fattetDato={gjeldende14aVedtak?.fattetDato}
                />
                <Hovedmaal hovedmal={gjeldende14aVedtak?.hovedmal} fattetDato={gjeldende14aVedtak?.fattetDato} />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
                <EnkeltInformasjon header="Servicegruppe" value={mapServicegruppeTilTekst(serviceGruppe)} />
            </span>
        </>
    );
};

export default Oppfolgingsinnhold;
