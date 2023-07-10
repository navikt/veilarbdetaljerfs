import { StringOrNothing } from './felles-typer';
import EMDASH from './emdash';

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
