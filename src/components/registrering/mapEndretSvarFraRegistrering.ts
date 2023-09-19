import { EndringIRegistreringsdata } from '../../data/api/datatyper/endringIRegistreringsData';
import { Sporsmal } from '../../data/api/datatyper/registreringsData';

export const permittertTekster: { [key: string]: string } = {
    TILBAKE_TIL_JOBB: 'Jeg skal tilbake i jobb hos min nåværende arbeidsgiver',
    OPPSIGELSE: 'Jeg har blitt sagt opp av arbeidsgiver',
    ENDRET_PERMITTERINGSPROSENT: ' Arbeidsgiver har endret permitteringen min',
    NY_JOBB: 'Jeg skal begynne å jobbe hos en annen arbeidsgiver',
    MIDLERTIDIG_JOBB: 'Jeg har fått midlertidig jobb hos en annen arbeidsgiver',
    KONKURS: 'Arbeidsgiveren min er konkurs',
    SAGT_OPP: 'Jeg har sagt opp jobben min',
    ANNET: 'Ingen av situasjonene passer for meg'
};

export const mapEndretSvarFraRegistrering = (
    sporsmal: Sporsmal,
    endringerIRegistreringsData: EndringIRegistreringsdata | undefined
) => {
    if (!endringerIRegistreringsData || !endringerIRegistreringsData.erBesvarelsenEndret) {
        return sporsmal;
    }

    if (sporsmal.sporsmalId === 'dinSituasjon' && !!endringerIRegistreringsData.besvarelse?.dinSituasjon?.endretAv) {
        return {
            ...sporsmal,
            svar: endringerIRegistreringsData.besvarelse?.dinSituasjon.verdi
                ? permittertTekster[endringerIRegistreringsData.besvarelse?.dinSituasjon.verdi]
                : '',
            endretAv: endringerIRegistreringsData.besvarelse?.dinSituasjon.endretAv,
            endretDato: endringerIRegistreringsData.besvarelse?.dinSituasjon.endretTidspunkt
        } as Sporsmal;
    }

    return sporsmal;
};
