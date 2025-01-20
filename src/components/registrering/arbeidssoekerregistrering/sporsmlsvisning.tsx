import {
    lagHentTekstForSprak,
    OpplysningerOmArbeidssoker,
    SporsmalId,
    SPORSMAL_TEKSTER
} from '@navikt/arbeidssokerregisteret-utils';
import { Sporsmalvisning, SporsmalvisningFlerSvar } from '../sporsmalsvisning';

interface Props {
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker;
}

export const SporsmalsListe = ({ opplysningerOmArbeidssoeker }: Props) => {
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, 'nb');
    const tekstEllerNull = (verdi: string | undefined) => (verdi ? tekst(verdi) : null);

    return (
        <div className="info_container">
            <Sporsmalvisning
                sporsmal={tekstEllerNull(SporsmalId.utdanning)}
                svar={tekstEllerNull(opplysningerOmArbeidssoeker.utdanning?.nus)}
            />
            <Sporsmalvisning
                sporsmal={tekstEllerNull(SporsmalId.utdanningBestatt)}
                svar={tekstEllerNull(opplysningerOmArbeidssoeker.utdanning?.bestaatt)}
            />
            <Sporsmalvisning
                sporsmal={tekstEllerNull(SporsmalId.utdanningGodkjent)}
                svar={tekstEllerNull(opplysningerOmArbeidssoeker.utdanning?.godkjent)}
            />
            <SporsmalvisningFlerSvar
                sporsmal={tekstEllerNull(SporsmalId.dinSituasjon)}
                svar={opplysningerOmArbeidssoeker.jobbsituasjon?.map((situasjon) =>
                    tekstEllerNull(situasjon.beskrivelse)
                )}
            />
            <Sporsmalvisning
                sporsmal={tekstEllerNull(SporsmalId.andreForhold)}
                svar={tekstEllerNull(opplysningerOmArbeidssoeker.annet?.andreForholdHindrerArbeid)}
            />
            <Sporsmalvisning
                sporsmal={tekstEllerNull(SporsmalId.helseHinder)}
                svar={tekstEllerNull(opplysningerOmArbeidssoeker.helse?.helsetilstandHindrerArbeid)}
            />
        </div>
    );
};
