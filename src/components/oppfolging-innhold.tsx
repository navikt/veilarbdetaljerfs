import { AlertMedFeilkode } from './felles/alert-med-feilkode.tsx';
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
import { useOppfolgingsstatus, usePersonalia, useGjeldende14aVedtak, useVeileder } from '../data/api/fetch';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { getForsteKorrelasjonsIdEllerNull } from '../utils/feilmelding-utils.ts';
import { Laster } from './felles/laster.tsx';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';

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
        data: gjeldende14aVedtak,
        error: gjeldende14avedtakError,
        isLoading: gjeldende14avedtakLoading
    } = useGjeldende14aVedtak(fnr);

    const serviceGruppe: OrNothing<ArenaServicegruppeKode> = oppfolgingsstatusData?.servicegruppe;

    if (oppfolgingsstatusLoading || personLoading || veilederLoading || gjeldende14avedtakLoading) {
        return <Laster />;
    }

    if (
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
        veilederError?.status === 204 ||
        veilederError?.status === 404
    ) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (oppfolgingsstatusError || personError || veilederError || gjeldende14avedtakError) {
        const feilkodeEllerNull = getForsteKorrelasjonsIdEllerNull([
            oppfolgingsstatusError,
            personError,
            veilederError,
            gjeldende14avedtakError
        ]);

        return (
            <AlertMedFeilkode feilkode={feilkodeEllerNull}>
                Noe gikk galt! Prøv igjen om noen minutter.
            </AlertMedFeilkode>
        );
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
