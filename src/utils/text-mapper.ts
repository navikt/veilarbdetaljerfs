import { Hovedmal, Innsatsgruppe } from '../data/api/datatyper/siste14aVedtak';
import EMDASH from './emdash';
import {
    ArenaHovedmalKode,
    OppfolgingsstatusData,
    ArenaServicegruppeKode
} from '../data/api/datatyper/oppfolgingsstatus';
import { OrNothing, StringOrNothing, isNullOrUndefined } from './felles-typer';
import { PersonaliaInfo } from '../data/api/datatyper/personalia';
import { VeilederData } from '../data/api/datatyper/veileder';
import { TilrettelagtKommunikasjonData } from '../data/api/datatyper/tilrettelagtKommunikasjon';
import { VedtakType } from '../data/api/datatyper/ytelse';
import { VEDTAKSSTATUSER } from './konstanter.ts';
import { ProfilertTil } from '@navikt/arbeidssokerregisteret-utils';
import { HovedmalType, InnsatsgruppeType, Kodeverk14a } from '../data/api/datatyper/kodeverk14aData.ts';

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
const konverterInnsatsgruppeKodeTilTekst = (innsatsgruppeObj: OrNothing<InnsatsgruppeType>) => {
    if (!isNullOrUndefined(innsatsgruppeObj)) {
        return innsatsgruppeObj?.kode
            .slice(0, innsatsgruppeObj?.kode.indexOf('_INNSATS'))
            .replaceAll('_', ' ')
            .toLowerCase();
    }
    return EMDASH;
}

export const hentBeskrivelseTilInnsatsgruppe = (innsatsgruppe: StringOrNothing, kodeverk14a: OrNothing<Kodeverk14a>) => {
    if (innsatsgruppe) {
        const kodeverkInnsatsgruppeObj: OrNothing<InnsatsgruppeType> = kodeverk14a?.innsatsgrupper.filter(
            (kodeverkInnsatsgruppe) =>
                Object.values(kodeverkInnsatsgruppe).some((kodeverkInnsatsgruppe) =>
                    kodeverkInnsatsgruppe.includes(innsatsgruppe)
                )
        )[0];
        const innsatsgruppeKodeTekst = konverterInnsatsgruppeKodeTilTekst(kodeverkInnsatsgruppeObj);
        const innsatsgruppeBeskrivelse = kodeverkInnsatsgruppeObj?.beskrivelse;
        return `${innsatsgruppeBeskrivelse} (${innsatsgruppeKodeTekst})`;
    } else {
        return EMDASH;
    }
}

export const hentBeskrivelseTilHovedmal = (hovedmal: StringOrNothing, kodeverk14a: OrNothing<Kodeverk14a>) => {
    if (hovedmal === Hovedmal.OKE_DELTAKELSE) {
        return 'Øke deltagelse eller mål om arbeid';
    } else if (hovedmal) {
        const kodeverkHovedmalObj: OrNothing<HovedmalType> = kodeverk14a?.hovedmal.filter((kodeverkHovedmal) =>
            Object.values(kodeverkHovedmal).some((kodeverkHovedmal) => kodeverkHovedmal.includes(hovedmal))
        )[0];
        return kodeverkHovedmalObj?.beskrivelse;
    } else {
        return EMDASH;
    }
};

