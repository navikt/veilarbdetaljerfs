import { Gradering, PersonsBarn } from '../data/api/datatyper/personalia.ts';

/** Finner ut hvor gammel en person er i dag */
export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}

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
    if (barn.gradering === Gradering.UGRADERT || barn.erDod || barn.harVeilederTilgang) {
        return `${barn.fornavn} (${finnAlderTekstForBarn(barn)})`;
    }
    return 'Barn (adressebeskyttelse)';
};

/** Returnerer alle barn som er under en viss alder. */
export const finnBarnUnderEnBestemtAlder = (alleBarn: PersonsBarn[], maksalder: number) => {
    return alleBarn.filter((barn) => kalkulerAlder(new Date(barn.fodselsdato)) < maksalder);
};
