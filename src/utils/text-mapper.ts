import EMDASH from './emdash';
import { OppfolgingsstatusData, ArenaServicegruppeKode } from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing, StringOrNothing, isNullOrUndefined } from './felles-typer';
import { PersonaliaInfo } from '../data/api/datatyper/personalia';
import { VeilederData } from '../data/api/datatyper/veileder';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { VedtakType } from '../data/api/datatyper/ytelse';
import { VEDTAKSSTATUSER } from './konstanter.ts';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';

export function mapServicegruppeTilTekst(servicegruppe: OrNothing<ArenaServicegruppeKode>): string {
    switch (servicegruppe) {
        case 'IVURD':
            return 'Ikke vurdert';
        case 'OPPFI':
            return 'Helserelatert arbeidsrettet oppfølging i Nav';
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

export function profilertTilBeskrivelse(profilertTil: ProfilertTil) {
    switch (profilertTil) {
        case ProfilertTil.ANTATT_GODE_MULIGHETER:
            return 'Antatt rask overgang til arbeid: Vurder om brukeren har gode muligheter til å beholde eller komme i jobb på egenhånd.';
        case ProfilertTil.ANTATT_BEHOV_FOR_VEILEDNING:
            return 'Antatt behov for veiledning: Vurder brukerens jobbmuligheter og behov for veiledning.';
        case ProfilertTil.OPPGITT_HINDRINGER:
            return 'Brukeren har oppgitt hindringer: Vurder brukerens jobbmuligheter og behov for veiledning.';
        default:
            return '';
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

export function hentGeografiskEnhetTekst(personalia: PersonaliaInfo | null | undefined): StringOrNothing {
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

    return `Tolk: ${tilrettelagtKommunikasjon?.talespraak}\nTegnspråk: ${tilrettelagtKommunikasjon?.tegnspraak}`;
}

export function getVedtakForVisning(vedtaksliste: VedtakType[] | undefined) {
    if (isNullOrUndefined(vedtaksliste) || vedtaksliste?.length === 0) {
        return EMDASH;
    }
    return vedtaksliste
        ?.filter((vedtak) => vedtak.status === VEDTAKSSTATUSER.iverksatt)
        .map((vedtak) => vedtak.type)
        .join(', ');
}
