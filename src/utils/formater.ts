import { KursVarighetEnhet, Kursvarighet } from '../data/api/datatyper/arenaperson';
import { PersonaliaTelefon } from '../data/api/datatyper/personalia';
import EMDASH from './emdash';
import { OrNothing, isNullOrUndefined } from './felles-typer';

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
            Date.UTC(Number(datoObjekt?.year), Number(datoObjekt?.month) - 1, Number(datoObjekt?.day))
        );
    }
    const shortOption: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const longOption: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    const options = onlyYearMonth || lokalDatoKunArManed ? shortOption : longOption;

    return lokalDato.toLocaleDateString('no-NO', options);
}

export function removeWhitespace(input: string) {
    return input.replace(/ /g, '');
}

export function formatNumber(format: string, streng: string) {
    let result = '';
    let strengIndex = 0;

    for (let i = 0; i < format.length; i++) {
        if (streng[strengIndex] === undefined) {
            break;
        }
        if (format[i] === '#') {
            result += streng[strengIndex++];
        } else {
            result += format[i];
        }
    }

    return result;
}

export function formaterTelefonnummer(telefon: PersonaliaTelefon | undefined | string) {
    if (!telefon) {
        return EMDASH;
    }
    let telefonNr = telefon?.toString();
    let landkode = '';

    if (telefonNr?.startsWith('0047')) {
        landkode = '+47';
        telefonNr = telefonNr.slice(4);
    } else if (telefonNr?.startsWith('+47')) {
        landkode = telefonNr.slice(0, 3);
        telefonNr = telefonNr.slice(3);
    }

    const tall = telefonNr?.split('');
    const splittTall = [];

    while (tall?.length) {
        splittTall.push(tall.splice(0, 2).join(''));
    }

    return `${landkode} ${splittTall.join(' ')}`;
}

export function formateStringInUpperAndLowerCase(str: OrNothing<string>) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : EMDASH;
}

export function formatStringInUpperAndLowerCaseUnderscore(str: OrNothing<string>) {
    return str
        ? str.replaceAll('_', ' ').charAt(0).toUpperCase() + str.replaceAll('_', ' ').slice(1).toLowerCase()
        : EMDASH;
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
