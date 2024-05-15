import {
    lagHentTekstForSprak,
    OpplysningerOmArbeidssoker,
    SporsmalId,
    SPORSMAL_TEKSTER
} from '@navikt/arbeidssokerregisteret-utils';
import { Sporsmalvisning, SporsmalvisningFlerSvar } from '../sporsmalsvisning.tsx';

interface Props {
    opplysningerOmArbeidssoeker: OpplysningerOmArbeidssoker;
}

export const SporsmalsListe = ({ opplysningerOmArbeidssoeker }: Props) => {
    const tekst = lagHentTekstForSprak(SPORSMAL_TEKSTER, 'nb');
    return (
        <div className="info_container">
            <Sporsmalvisning
                sporsmal={tekst(SporsmalId.utdanning)}
                svar={tekst(opplysningerOmArbeidssoeker.utdanning.nus)}
            />
            <Sporsmalvisning
                sporsmal={tekst(SporsmalId.utdanningBestatt)}
                svar={tekst(opplysningerOmArbeidssoeker.utdanning.bestaatt)}
            />
            <Sporsmalvisning
                sporsmal={tekst(SporsmalId.utdanningGodkjent)}
                svar={tekst(opplysningerOmArbeidssoeker.utdanning.godkjent)}
            />
            <SporsmalvisningFlerSvar
                sporsmal={tekst(SporsmalId.dinSituasjon)}
                svar={opplysningerOmArbeidssoeker.jobbsituasjon.map((situasjon) => tekst(situasjon.beskrivelse))}
            />
            <Sporsmalvisning
                sporsmal={tekst(SporsmalId.andreForhold)}
                svar={tekst(opplysningerOmArbeidssoeker.annet.andreForholdHindrerArbeid)}
            />
            <Sporsmalvisning
                sporsmal={tekst(SporsmalId.helseHinder)}
                svar={tekst(opplysningerOmArbeidssoeker.helse.helsetilstandHindrerArbeid)}
            />
        </div>
    );
};
