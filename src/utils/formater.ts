import EMDASH from './emdash';
import { OrNothing, StringOrNothing, isNullOrUndefined } from './felles-typer';

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

export function isNotEmptyArray(param: any[]): boolean {
    return param && param.length !== 0;
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

export function formaterTelefonnummer(landkode: StringOrNothing, telefonnummer: string) {
    const utenSpace = removeWhitespace(telefonnummer);
    const formatertLandkode = landkode ? landkode + ' ' : '';

    if (utenSpace.length !== 8) {
        return telefonnummer;
    } else if (utenSpace.substring(0, 3) === '800') {
        return formatertLandkode + formatNumber('### ## ###', utenSpace);
    } else {
        return formatertLandkode + formatNumber('## ## ## ##', utenSpace);
    }
}
export function formateStringInUpperAndLowerCase(str: OrNothing<string>) {
	return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : EMDASH;
}

export function formatStringInUpperAndLowerCaseUnderscore(str: OrNothing<string>) {
    return str
        ? str.replaceAll('_', ' ').charAt(0).toUpperCase() + str.replaceAll('_', ' ').slice(1).toLowerCase()
        : EMDASH;
}
