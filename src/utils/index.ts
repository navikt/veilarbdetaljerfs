import { StringOrNothing } from './felles-typer';
import EMDASH from './emdash';
import { finnInternNavDomene, finnInternNavDomeneGammelt } from './miljo-utils';

// export function visEmdashHvisNull(verdi: StringOrNothing) {
// 	return verdi ? verdi : EMDASH;
// }

export function visEmdashHvisTom<T>(verdi: T[]): T[] | string {
    return verdi.length > 0 ? verdi : EMDASH;
}

export function safeMap<T, S>(verdi: T[] | null, fn: (t: T, i: number) => S): S[] | string {
    if (verdi == null) {
        return EMDASH;
    }
    return visEmdashHvisTom(verdi.map(fn));
}

export function safeSort(a: StringOrNothing, b: StringOrNothing) {
    if (a && b) {
        return a.localeCompare(b);
    } else if (a) {
        return -1;
    } else if (b) {
        return 1;
    } else {
        return 0;
    }
}

export function byggPamUrl(path = '/min-cv') {
    return `https://pam-personbruker-veileder.${finnInternNavDomene()}${path}}`;
}

export function lagPersonforvalterLenke(aktoerIdEllerFnr: string) {
    //Personforvalteren skal takle både aktørid og fnr.
    return `https://pdl-web.${finnInternNavDomeneGammelt()}/endreperson?aktoerId=${aktoerIdEllerFnr}`;
}
