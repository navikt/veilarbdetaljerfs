import { DobbeltInformasjon } from './felles/dobbelinfo.tsx';
import { formaterDato } from '../utils/formater.ts';
import { useKodeverk14a } from '../data/api/fetch.ts';
import { Errormelding, Laster } from './felles/minikomponenter.tsx';
import { isNullOrUndefined, OrNothing, StringOrNothing } from '../utils/felles-typer.ts';
import { InnsatsgruppeType } from '../data/api/datatyper/kodeverk14aData.ts';
import { EnkeltInformasjon } from './felles/enkeltInfo.tsx';

interface Props {
    innsatsgruppe: StringOrNothing;
    fattetDato: StringOrNothing;
}

export const InnsatsGruppe = ({ innsatsgruppe, fattetDato }: Props) => {
    const { data: kodeverk14a, isLoading: kodeverk14aLoading, error: kodeverk14aError } = useKodeverk14a();

    if (kodeverk14aLoading) {
        return <Laster />;
    }

    if (kodeverk14aError) {
        return <Errormelding />;
    }

    const konverterInnsatsgruppeKodeTilTekst = (innsatsgruppeObj: OrNothing<InnsatsgruppeType>) => {
        if (!isNullOrUndefined(innsatsgruppeObj?.gammelKode)) {
            return `(${innsatsgruppeObj?.gammelKode
                .slice(0, innsatsgruppeObj?.gammelKode.indexOf('_INNSATS'))
                .replaceAll('_', ' ')
                .toLowerCase()})`;
        }
        return '';
    };

    const hentBeskrivelseTilInnsatsgruppe = (innsatsgruppe: StringOrNothing) => {
        if (innsatsgruppe) {
            const kodeverkForInnsatsgruppe: OrNothing<InnsatsgruppeType> = kodeverk14a?.innsatsgrupper.filter(
                (kodeverk) => kodeverk.kode === innsatsgruppe
            )[0];
            const innsatsgruppeKodeTekst = konverterInnsatsgruppeKodeTilTekst(kodeverkForInnsatsgruppe);
            const innsatsgruppeBeskrivelse = kodeverkForInnsatsgruppe?.beskrivelse;
            return `${innsatsgruppeBeskrivelse} ${innsatsgruppeKodeTekst}`;
        } else {
            return 'Har ikke et gjeldende § 14 a-vedtak';
        }
    };

    return innsatsgruppe ? (
        <DobbeltInformasjon
            header="Innsatsgruppe (gjeldende § 14 a-vedtak)"
            values={[hentBeskrivelseTilInnsatsgruppe(innsatsgruppe), `Vedtaksdato: ${formaterDato(fattetDato)}`]}
        />
    ) : (
        <EnkeltInformasjon
            header="Innsatsgruppe (gjeldende § 14 a-vedtak)"
            value={hentBeskrivelseTilInnsatsgruppe(innsatsgruppe)}
        />
    );
};
