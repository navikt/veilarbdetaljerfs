import { OrNothing, StringOrNothing } from '../utils/felles-typer.ts';
import { HovedmalType } from '../data/api/datatyper/kodeverk14aData.ts';
import { Hovedmal } from '../data/api/datatyper/siste14aVedtak.ts';
import EMDASH from '../utils/emdash.ts';
import { Errormelding, Laster } from './felles/minikomponenter.tsx';
import { useKodeverk14a } from '../data/api/fetch.ts';
import { DobbeltInformasjon } from './felles/dobbelinfo.tsx';
import { formaterDato } from '../utils/formater.ts';
import { EnkeltInformasjon } from './felles/enkeltInfo.tsx';

interface Props {
    hovedmal: StringOrNothing;
    fattetDato: StringOrNothing;
}
export const Hovedmaal = ({ hovedmal, fattetDato }: Props) => {
    const { data: kodeverk14a, isLoading: kodeverk14aLoading, error: kodeverk14aError } = useKodeverk14a();

    if (kodeverk14aLoading) {
        return <Laster />;
    }

    if (kodeverk14aError) {
        return <Errormelding />;
    }

    const hentBeskrivelseTilHovedmal = (hovedmal: StringOrNothing) => {
        if (hovedmal === Hovedmal.OKE_DELTAKELSE.toString()) {
            return 'Øke deltagelse eller mål om arbeid';
        } else if (hovedmal) {
            const kodeverkHovedmalObj: OrNothing<HovedmalType> = kodeverk14a?.hovedmal.filter((kodeverkHovedmal) =>
                Object.values(kodeverkHovedmal).some((kodeverkHovedmal) => kodeverkHovedmal.includes(hovedmal))
            )[0];
            return kodeverkHovedmalObj?.beskrivelse;
        } else {
            return EMDASH;
        }
    };

    return hovedmal ? (
        <DobbeltInformasjon
            header="Hovedmål (gjeldende § 14 a-vedtak)"
            values={[hentBeskrivelseTilHovedmal(hovedmal), `Vedtaksdato: ${formaterDato(fattetDato)}`]}
        />
    ) : (
        <EnkeltInformasjon header="Hovedmål (gjeldende § 14 a-vedtak)" value={'Har ikke et gjeldende § 14 a-vedtak'} />
    );
};
