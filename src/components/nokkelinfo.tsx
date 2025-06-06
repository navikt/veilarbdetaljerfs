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
import { PersonsBarn } from '../data/api/datatyper/personalia';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { OrNothing, StringOrNothing } from '../utils/felles-typer';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { getVedtakForVisning, hentTolkTekst, hentVeilederTekst } from '../utils/text-mapper';
import { formaterDato, formaterTelefonnummer, formatStringInUpperAndLowerCaseUnderscore } from '../utils/formater';
import { finnAlder, kalkulerAlder } from '../utils/date-utils';
import { EnkeltInformasjonMedCopy } from './felles/enkeltInfoMedCopy';
import EMDASH from '../utils/emdash';
import './nokkelinfo.css';
import { hentBehandlingsnummer } from '../utils/konstanter.ts';
import { InnsatsGruppe } from './innsatsgruppe.tsx';
import { Hovedmaal } from './hovedmal.tsx';
import { ErrorAlertMedFeilkode } from './felles/error-alert-med-feilkode.tsx';

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
        oppfolgingsstatusError?.status === 204 ||
        oppfolgingsstatusError?.status === 404 ||
        personError?.status === 204 ||
        personError?.status === 404 ||
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
        tolkError ||
        ytelserError ||
        veilederError ||
        opplysningerOmArbedissoekerMedProfileringError ||
        gjeldende14aVedtakError
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
            <ErrorAlertMedFeilkode feilkoder={feilkoder}>
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
    const barnUnder21: PersonsBarn[] =
        (personData?.barn &&
            personData?.barn.filter(
                (enkeltBarn) => kalkulerAlder(new Date(enkeltBarn.fodselsdato)) < MAX_ALDER_BARN
            )) ||
        [];

    const barnNavn: string =
        barnUnder21.length > 0 ? barnUnder21.map((barn) => `${barn.fornavn} (${finnAlder(barn)})`).join(', ') : EMDASH;

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
            <EnkeltInformasjon header="Barn under 21 år" value={barnNavn} />
            <InnsatsGruppe
                innsatsgruppe={gjeldende14aVedtak?.innsatsgruppe}
                fattetDato={gjeldende14aVedtak?.fattetDato}
            />
            <Hovedmaal hovedmal={gjeldende14aVedtak?.hovedmal} fattetDato={gjeldende14aVedtak?.fattetDato} />
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
            <EnkeltInformasjon header="Aktive ytelse(r)" value={getVedtakForVisning(ytelserData?.vedtak)} />
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
