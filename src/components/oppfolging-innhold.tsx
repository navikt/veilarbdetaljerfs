import { Errormelding, Laster } from './felles/minikomponenter';
import { useAppStore } from '../stores/app-store';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { hentGeografiskEnhetTekst, hentOppfolgingsEnhetTekst, hentVeilederTekst } from '../utils/text-mapper';
import {
    useGjeldende14aVedtak,
    useOppfolgingsEnhet,
    usePersonalia,
    useVeileder,
    useVeilederTilordning
} from '../data/api/fetch';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';

const Oppfolgingsinnhold = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = hentBehandlingsnummer();

    const {
        data: tilordnetVeileder,
        error: tilordnetVeilederError,
        isLoading: tilordnetVeilederLoading
    } = useVeilederTilordning(fnr);

    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr!, behandlingsnummer);
    const { data: veilederData, error: veilederError, isLoading: veilederLoading } = useVeileder(tilordnetVeileder);

    const {
        data: oppfolgingsEnhetData,
        error: oppfolgingsEnhetError,
        isLoading: oppfolgingsEnhetLoading
    } = useOppfolgingsEnhet(fnr);

    const {
        data: gjeldende14aVedtak,
        error: gjeldende14avedtakError,
        isLoading: gjeldende14avedtakLoading
    } = useGjeldende14aVedtak(fnr);

    if (
        tilordnetVeilederLoading ||
        personLoading ||
        veilederLoading ||
        gjeldende14avedtakLoading ||
        oppfolgingsEnhetLoading
    ) {
        return <Laster />;
    }

    if (
        tilordnetVeilederError?.status === 204 ||
        tilordnetVeilederError?.status === 404 ||
        oppfolgingsEnhetError?.status === 204 ||
        oppfolgingsEnhetError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (tilordnetVeilederError || personError || veilederError || gjeldende14avedtakError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <EnkeltInformasjon header="Geografisk enhet" value={hentGeografiskEnhetTekst(personData)} />
                <EnkeltInformasjon header="Oppfølgingsenhet" value={hentOppfolgingsEnhetTekst(oppfolgingsEnhetData)} />
                <InnsatsGruppe
                    innsatsgruppe={gjeldende14aVedtak?.innsatsgruppe}
                    fattetDato={gjeldende14aVedtak?.fattetDato}
                />
                <Hovedmaal
                    hovedmal={gjeldende14aVedtak?.hovedmal}
                    fattetDato={gjeldende14aVedtak?.fattetDato}
                    harGjeldendeOppfolgingsvedtak={!!gjeldende14aVedtak}
                />
                <EnkeltInformasjon header="Veileder" value={hentVeilederTekst(veilederData)} />
            </span>
        </>
    );
};

export default Oppfolgingsinnhold;
