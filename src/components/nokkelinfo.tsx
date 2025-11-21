import { Heading, Panel } from '@navikt/ds-react';
import { Laster } from './felles/minikomponenter';
import { useAppStore } from '../stores/app-store';
import {
    useCvOgJobbonsker,
    useGjeldende14aVedtak,
    useOppfolgingsstatus,
    useOpplysningerOmArbeidssoekerMedProfilering,
    usePersonalia,
    useTolk,
    useVeileder,
    useYtelser
} from '../data/api/fetch';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { getVedtakForVisning, hentTolkTekst, hentVeilederTekst } from '../utils/text-mapper';
import { formaterDato, formaterTelefonnummer, formatStringInUpperAndLowerCaseUnderscore } from '../utils/formater';
import { finnBarnUnderEnBestemtAlder, finnNavnOgAlderTekstForBarn } from '../utils/barn-utils.ts';
import { EnkeltInformasjonMedCopy } from './felles/enkeltInfoMedCopy';
import EMDASH from '../utils/emdash';
import './nokkelinfo.css';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';
import { ErrorAlertMedFeilkode } from './felles/error-alert-med-feilkode.tsx';
import { ModiaPersonoversiktLenke } from './modia-personoversikt-lenke.tsx';

const Nokkelinfoinnhold = () => {
    const { fnr } = useAppStore();
    const behandlingsnummer = hentBehandlingsnummer();

    const {
        data: oppfolgingsstatusData,
        error: oppfolgingsstatusError,
        isLoading: oppfolgingsstatusLoading
    } = useOppfolgingsstatus(fnr);
    const { data: personData, error: personError, isLoading: personLoading } = usePersonalia(fnr!, behandlingsnummer);
    const {
        data: opplysningerOmArbedissoekerMedProfilering,
        error: opplysningerOmArbedissoekerMedProfileringError,
        isLoading: opplysningerOmArbedissoekerMedProfileringLoading
    } = useOpplysningerOmArbeidssoekerMedProfilering(fnr);
    const { data: tolkData, error: tolkError, isLoading: tolkLoading } = useTolk(fnr!, behandlingsnummer);
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
    const {
        data: gjeldende14aVedtak,
        error: gjeldende14aVedtakError,
        isLoading: gjeldende14aVedtakLoading
    } = useGjeldende14aVedtak(fnr);

    if (
        oppfolgingsstatusLoading ||
        personLoading ||
        tolkLoading ||
        ytelserLoading ||
        cvOgJobbonskerLoading ||
        veilederLoading ||
        opplysningerOmArbedissoekerMedProfileringLoading ||
        gjeldende14aVedtakLoading
    ) {
        return <Laster />;
    }

    if (
        [
            oppfolgingsstatusError,
            personError,
            tolkError,
            ytelserError,
            veilederError,
            opplysningerOmArbedissoekerMedProfileringError,
            gjeldende14aVedtakError
        ].some((error) => {
            // HTTP 404 representerer manglande data og vi tolkar det difor ikkje som feil
            return error && error.status !== 404;
        })
    ) {
        const feilkoder = [
            oppfolgingsstatusError,
            personError,
            tolkError,
            ytelserError,
            veilederError,
            opplysningerOmArbedissoekerMedProfileringError,
            gjeldende14aVedtakError
        ]
            .map((errorMessage) => errorMessage?.korrelasjonId ?? null)
            .filter((korrelasjonId) => korrelasjonId !== null);

        return (
            <ErrorAlertMedFeilkode feilkoder={feilkoder} aktiverSporing>
                Noe gikk galt! Prøv igjen om noen minutter.
            </ErrorAlertMedFeilkode>
        );
    }

    const telefon: StringOrNothing = personData?.telefon?.find((entry) => entry.prioritet === '1')?.telefonNr;
    const taletolk: OrNothing<TilrettelagtKommunikasjonData> = tolkData;
    const onsketYrkeTitles: string[] = cvOgJobbonskerData?.jobbprofil?.onsketYrke.map((yrke) => yrke.tittel) || [];
    const jobbonsker: string = onsketYrkeTitles.length > 0 ? onsketYrkeTitles.join(', ') : EMDASH;
    const sivilstatus: StringOrNothing = personData?.sivilstandliste?.[0]?.sivilstand;
    const datoRegistrert: StringOrNothing =
        opplysningerOmArbedissoekerMedProfilering?.arbeidssoekerperiodeStartet ?? null;
    const MAX_ALDER_BARN = 21;

    const navnOgAlderPaBarnUnder21 = () => {
        const barnUnder21 = (personData?.barn && finnBarnUnderEnBestemtAlder(personData.barn, MAX_ALDER_BARN)) || [];

        if (barnUnder21.length <= 0) {
            return EMDASH;
        }
        return barnUnder21.map((barn) => finnNavnOgAlderTekstForBarn(barn)).join(', ');
    };

    const mapErrorCvOgJobbonsker = (errorStatus: number | null | undefined): StringOrNothing => {
        switch (errorStatus) {
            case 403:
                return 'Du har ikke tilgang. Mer informasjon i jobbønsker-boksen.';
            default:
                return null;
        }
    };

    return (
        <span className="nokkelinfo_container" style={{ whiteSpace: 'pre-line' }}>
            <EnkeltInformasjonMedCopy header="Telefonnummer" value={formaterTelefonnummer(telefon)} />
            <EnkeltInformasjon header="Barn under 21 år" value={navnOgAlderPaBarnUnder21()} />
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
            <EnkeltInformasjon header="Tilrettelagt kommunikasjon" value={hentTolkTekst(taletolk)} />
            <EnkeltInformasjon header="Sivilstand" value={formatStringInUpperAndLowerCaseUnderscore(sivilstatus)} />
            <EnkeltInformasjon
                header="Jobbønsker"
                value={jobbonsker}
                errorMessage={mapErrorCvOgJobbonsker(cvOgJobbonskerError?.status)}
            />
            <EnkeltInformasjon
                header="Registrert dato"
                value={formaterDato(datoRegistrert)}
                tilleggsinfo={datoRegistrert ? 'Arbeidssøkerregisteret' : null}
            />
            <EnkeltInformasjon
                header="Aktive ytelser (Arena)"
                value={getVedtakForVisning(ytelserData?.vedtak)}
                lenkeinfo={<ModiaPersonoversiktLenke />}
            />
        </span>
    );
};

const Nokkelinfo = () => {
    return (
        <Panel border className="nokkelinfo_panel">
            <Heading spacing level="2" size="medium">
                Nøkkelinformasjon
            </Heading>
            <Nokkelinfoinnhold />
        </Panel>
    );
};

export default Nokkelinfo;
