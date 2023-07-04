import EMDASH from './emdash';
import { isNullOrUndefined } from './felles-typer';

export interface DatoType {
    year: string;
    month: string;
    day: string;
}

export function formaterDato(datoObjekt: DatoType | string | undefined | null, onlyYearMonth?: boolean) {
    if (isNullOrUndefined(datoObjekt)) {
        return EMDASH;
    }

    let lokalDato;
    let lokalDatoKunArManed = false;
    const yearMonthReg = /^\d{4}-\d{2}$/;
    if (typeof datoObjekt === 'string') {
        lokalDatoKunArManed = yearMonthReg.test(datoObjekt);
        lokalDato = new Date(datoObjekt);
    } else {
        lokalDato = new Date(
            Date.UTC(Number(datoObjekt!.year), Number(datoObjekt!.month) - 1, Number(datoObjekt!.day))
        );
    }
    const shortOption: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const longOption: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const options = onlyYearMonth || lokalDatoKunArManed ? shortOption : longOption;

    return lokalDato.toLocaleDateString('no-NO', options);
}

export function kalkulerAlder(fodselsdato: Date): number {
    const diff = Date.now() - fodselsdato.getTime();
    return new Date(diff).getUTCFullYear() - 1970;
}
