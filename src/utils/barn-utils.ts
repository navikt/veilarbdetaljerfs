import { Gradering, PersonsBarn } from '../data/api/datatyper/personalia.ts';

/** Returnerer alder på barn, eller 'DØD' dersom barnet ikke lever lenger. */
export function finnAlderTekstForBarn(personalia: { alder: number; erDod: boolean }): string {
    if (personalia.erDod) {
        return 'DØD';
    }

    return `${personalia.alder}`;
}

/**
 * Returnerer tekststreng med navn og alder for barn.
 * Dersom barnet har adressebeskyttelse maskeres denne informasjonen.
 * */
export const finnNavnOgAlderTekstForBarn = (barn: PersonsBarn) => {
    const adressebeskyttet =
        barn.gradering?.includes(Gradering.STRENGT_FORTROLIG) ||
        barn.gradering?.includes(Gradering.FORTROLIG) ||
        barn.gradering?.includes(Gradering.STRENGT_FORTROLIG_UTLAND);
    // fornavn DØD
    if (barn.erDod) {
        return `${barn.fornavn} (${finnAlderTekstForBarn(barn)})`;
    }
    //'Barn (skjermet)' alder
    if (!adressebeskyttet && !barn.harVeilederTilgang && barn.erEgenAnsatt) {
        return `'Barn (skjermet)' (${finnAlderTekstForBarn(barn)})`;
    }
    //'Barn (adressebeskyttelse)'
    if (adressebeskyttet && !barn.harVeilederTilgang) {
        return 'Barn (adressebeskyttelse)';
    }
    //Når veileder har tilgang
    return `${barn.fornavn} (${finnAlderTekstForBarn(barn)})`;
};

/** Returnerer alle barn som er under en viss alder. */
export const finnBarnUnderEnBestemtAlder = (alleBarn: PersonsBarn[], maksalder: number) => {
    return alleBarn.filter((barn) => barn.alder < maksalder);
};
