import { KursVarighetEnhet, Kursvarighet } from '../data/api/datatyper/arenaperson';
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

export function formaterVarighet(varighet: Kursvarighet): string {
    if (varighet.varighet == null || varighet.tidsenhet == null) {
        return EMDASH;
    }
    const storreEnnEn = varighet.varighet > 1;
    let enhetTekst = '';

    switch (varighet.tidsenhet) {
        case KursVarighetEnhet.TIME:
            enhetTekst = storreEnnEn ? 'timer' : 'time';
            break;
        case KursVarighetEnhet.DAG:
            enhetTekst = storreEnnEn ? 'dager' : 'dag';
            break;
        case KursVarighetEnhet.UKE:
            enhetTekst = storreEnnEn ? 'uker' : 'uke';
            break;
        case KursVarighetEnhet.MND:
            enhetTekst = storreEnnEn ? 'måneder' : 'måned';
            break;
        default:
            return EMDASH;
    }

    return `${varighet.varighet} ${enhetTekst}`;
}
