import { Gradering, RelasjonsBosted } from '../data/api/datatyper/personalia';
import EMDASH from './emdash';
import { OrNothing } from './felles-typer';

export const VEDTAKSSTATUSER = {
    avsluttet: 'Avsluttet',
    iverksatt: 'Iverksatt'
};

export function hentKilde(master: OrNothing<string>) {
    switch (master?.toLowerCase()) {
        case 'krr':
            return 'i Kontakt- og reservasjonsregisteret';
        case 'pdl':
            return 'av NAV';
        case 'freg':
            return 'i Folkeregisteret';
        default:
            return `i ${master}`;
    }
}

export function graderingBeskrivelsePartner(gradering: Gradering) {
    return 'Partner har adressebeskyttelse, ' + gradering.toLowerCase().replaceAll('_', ' ');
}

export function graderingBeskrivelseBarn(gradering: Gradering) {
    return 'Barnet har adressebeskyttelse, ' + gradering.toLowerCase().replaceAll('_', ' ');
}

export function hentBorMedPartnerBeskrivelse(relasjonsBosted: RelasjonsBosted) {
    switch (relasjonsBosted) {
        case RelasjonsBosted.SAMME_BOSTED:
            return 'Partner bor med bruker';
        case RelasjonsBosted.ANNET_BOSTED:
            return 'Partner bor ikke med bruker';
        case RelasjonsBosted.UKJENT_BOSTED:
            return 'Partners bosted er ukjent';
        default:
            return null;
    }
}

export function hentBorMedBarnBeskrivelse(relasjonsBosted: RelasjonsBosted | null) {
    switch (relasjonsBosted) {
        case RelasjonsBosted.SAMME_BOSTED:
            return 'Bor med bruker';
        case RelasjonsBosted.ANNET_BOSTED:
            return 'Bor ikke med bruker';
        case RelasjonsBosted.UKJENT_BOSTED:
            return 'Bosted er ukjent';
        default:
            return null;
    }
}

export function egenAnsattTekst() {
    return 'Partner er skjermet for innsyn';
}

export function hentMalform(malform: OrNothing<string>) {
    switch (malform) {
        case 'nn':
            return 'Nynorsk';
        case 'nb':
            return 'Bokmål';
        case 'en':
            return 'Engelsk';
        case 'se':
            return 'Nordsamisk';
        default:
            return EMDASH;
    }
}

export function hentBehandlingsnummer() {
    return 'B640';
}
