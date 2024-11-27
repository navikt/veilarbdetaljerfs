import { DobbeltInformasjon } from './felles/dobbelinfo.tsx';
import { formaterDato } from '../utils/formater.ts';
import { useKodeverk14a } from '../data/api/fetch.ts';
import { Errormelding, Laster } from './felles/minikomponenter.tsx';
import { isNullOrUndefined, OrNothing, StringOrNothing } from '../utils/felles-typer.ts';
import { InnsatsgruppeType } from '../data/api/datatyper/kodeverk14aData.ts';
import EMDASH from '../utils/emdash.ts';

interface Props {
    innsatsgruppe: StringOrNothing;
    fattetDato: StringOrNothing;
}
export const InnsatsGruppe = ({innsatsgruppe, fattetDato} : Props ) => {
    const {
        data: kodeverk14a, isLoading: kodeverk14aLoading, error: kodeverk14aError
    } = useKodeverk14a();

    if ( kodeverk14aLoading) {
        return <Laster />;
    }

    if ( kodeverk14aError ) {
        return <Errormelding />;
    }

    const konverterInnsatsgruppeKodeTilTekst = (innsatsgruppeObj: OrNothing<InnsatsgruppeType>) => {
        if (!isNullOrUndefined(innsatsgruppeObj)) {
            return innsatsgruppeObj?.kode
                .slice(0, innsatsgruppeObj?.kode.indexOf('_INNSATS'))
                .replaceAll('_', ' ')
                .toLowerCase();
        }
        return EMDASH;
    }

    const hentBeskrivelseTilInnsatsgruppe = (innsatsgruppe: StringOrNothing) => {
        if (innsatsgruppe) {
            const kodeverkInnsatsgruppeObj: OrNothing<InnsatsgruppeType> = kodeverk14a?.innsatsgrupper.filter(
                (kodeverkInnsatsgruppe) =>
                    Object.values(kodeverkInnsatsgruppe).some((kodeverkInnsatsgruppe) =>
                        kodeverkInnsatsgruppe.includes(innsatsgruppe)
                    )
            )[0];
            const innsatsgruppeKodeTekst = konverterInnsatsgruppeKodeTilTekst(kodeverkInnsatsgruppeObj);
            const innsatsgruppeBeskrivelse = kodeverkInnsatsgruppeObj?.beskrivelse;
            return `${innsatsgruppeBeskrivelse} (${innsatsgruppeKodeTekst})`;
        } else {
            return EMDASH;
        }
    }

    return (
        <DobbeltInformasjon
            header="Innsatsgruppe (gjeldende § 14a-vedtak)"
            values={[
                hentBeskrivelseTilInnsatsgruppe(innsatsgruppe),
                `Vedtaksdato: ${formaterDato(fattetDato)}`
            ]}
        />
    )
}