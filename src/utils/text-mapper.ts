import { Hovedmal, Innsatsgruppe } from '../data/api/datatyper/siste14aVedtak';
import EMDASH from './emdash';
import {
    ArenaHovedmalKode,
    OppfolgingsstatusData,
    ArenaServicegruppeKode
} from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing, StringOrNothing, isNullOrUndefined } from './felles-typer';
import { PersonaliaV2Info } from '../data/api/datatyper/personalia';
import { VeilederData } from '../data/api/datatyper/veileder';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { VedtakType } from '../data/api/datatyper/ytelse';
import { VEDTAKSSTATUSER } from '../utils/konstanter';

export function mapServicegruppeTilTekst(servicegruppe: OrNothing<ArenaServicegruppeKode>): string {
    switch (servicegruppe) {
        case 'IVURD':
            return 'Ikke vurdert';
        case 'OPPFI':
            return 'Helserelatert arbeidsrettet oppfølging i NAV';
        case 'VURDI':
            return 'Sykmeldt, oppfølging på arbeidsplassen';
        case 'VURDU':
            return 'Sykmeldt uten arbeidsgiver';
        case 'BKART':
            return 'Behov for arbeidsevnevurdering';
        case 'KAP11':
            return 'Rettigheter etter Ftrl. Kapittel 11';
        default:
            return EMDASH;
    }
}

export function mapHovedmalTilTekst(hovedmal: OrNothing<Hovedmal | ArenaHovedmalKode>): string {
    switch (hovedmal) {
        case Hovedmal.BEHOLDE_ARBEID:
        case 'BEHOLDEA':
            return 'Beholde arbeid';
        case Hovedmal.OKE_DELTAKELSE:
        case 'OKEDELT':
            return 'Øke deltakelse eller mål om arbeid';
        case Hovedmal.SKAFFE_ARBEID:
        case 'SKAFFEA':
            return 'Skaffe arbeid';
        default:
            return EMDASH;
    }
}

export function mapInnsatsgruppeTilTekst(innsatsgruppe: OrNothing<Innsatsgruppe | ArenaServicegruppeKode>): string {
    switch (innsatsgruppe) {
        case Innsatsgruppe.STANDARD_INNSATS:
        case 'IKVAL':
            return 'Standardinnsats';
        case Innsatsgruppe.SITUASJONSBESTEMT_INNSATS:
        case 'BFORM':
            return 'Situasjonsbestemt innsats';
        case Innsatsgruppe.SPESIELT_TILPASSET_INNSATS:
        case 'BATT':
            return 'Spesielt tilpasset innsats';
        case Innsatsgruppe.GRADERT_VARIG_TILPASSET_INNSATS:
            return 'Gradert varig tilpasset innsats';
        case Innsatsgruppe.VARIG_TILPASSET_INNSATS:
        case 'VARIG':
            return 'Varig tilpasset innsats';
        default:
            return EMDASH;
    }
}
export function hentOppfolgingsEnhetTekst(
    oppfolgingsstatus: OppfolgingsstatusData | null | undefined
): StringOrNothing {
    const enhetId = oppfolgingsstatus?.oppfolgingsenhet?.enhetId;
    const navn = oppfolgingsstatus?.oppfolgingsenhet?.navn;

    if (!enhetId && !navn) {
        return EMDASH;
    }
    if (!enhetId) {
        return `${navn}`;
    }
    if (!navn) {
        return `${enhetId}`;
    }
    return `${enhetId} ${navn}`;
}

export function hentGeografiskEnhetTekst(personalia: PersonaliaV2Info | null | undefined): StringOrNothing {
    const enhetsnummer = personalia?.geografiskEnhet?.enhetsnummer;
    const navn = personalia?.geografiskEnhet?.navn;

    if (!enhetsnummer && !navn) {
        return EMDASH;
    }
    if (!enhetsnummer) {
        return `${navn}`;
    }
    if (!navn) {
        return `${enhetsnummer}`;
    }
    return `${enhetsnummer} ${navn}`;
}

export function hentVeilederTekst(veileder: VeilederData | null | undefined): StringOrNothing {
    if (!veileder?.navn && !veileder?.ident) {
        return EMDASH;
    }
    if (!veileder.navn) {
        return veileder.ident;
    }

    if (!veileder.ident) {
        return veileder.navn;
    }

    return `${veileder.navn}, ${veileder.ident}`;
}

export function hentTolkTekst(tilrettelagtKommunikasjon: TilrettelagtKommunikasjonData | null | undefined) {
    if (
        isNullOrUndefined(tilrettelagtKommunikasjon?.talespraak) &&
        isNullOrUndefined(tilrettelagtKommunikasjon?.tegnspraak)
    ) {
        return EMDASH;
    }

    if (!tilrettelagtKommunikasjon?.talespraak) {
        return `Tegnspråk: ${tilrettelagtKommunikasjon?.tegnspraak}`;
    }

    if (!tilrettelagtKommunikasjon?.tegnspraak) {
        return `Tolk: ${tilrettelagtKommunikasjon?.talespraak}`;
    }

    return `Tolk: ${tilrettelagtKommunikasjon?.talespraak}, tegnspråk: ${tilrettelagtKommunikasjon?.tegnspraak}`;
}

export function getVedtakForVisning(vedtaksliste: VedtakType[] | undefined) {
    if (isNullOrUndefined(vedtaksliste)) {
        return null;
    }
    return vedtaksliste
        ?.filter((vedtak) => vedtak.status === VEDTAKSSTATUSER.iverksatt)
        .map((vedtak) => vedtak.vedtakstype)
        .join(', ');
}
