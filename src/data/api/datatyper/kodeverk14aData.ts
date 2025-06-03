export interface Kodeverk14a {
    innsatsgrupper: InnsatsgruppeType[];
    hovedmal: HovedmalType[];
}

export type InnsatsgruppeType = {
    kode: Innsatsgruppe;
    gammelKode: GammelInnsatsgruppe;
    beskrivelse: string;
    arenakode: ArenaKode;
};

export type HovedmalType = {
    kode: Hovedmal;
    beskrivelse: string;
};

export enum Hovedmal {
    SKAFFE_ARBEID = 'SKAFFE_ARBEID',
    BEHOLDE_ARBEID = 'BEHOLDE_ARBEID',
    OKE_DELTAKELSE = 'OKE_DELTAKELSE'
}

export enum Innsatsgruppe {
    GODE_MULIGHETER = 'GODE_MULIGHETER',
    TRENGER_VEILEDNING = 'TRENGER_VEILEDNING',
    TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE = 'TRENGER_VEILEDNING_NEDSATT_ARBEIDSEVNE',
    JOBBE_DELVIS = 'JOBBE_DELVIS',
    LITEN_MULIGHET_TIL_A_JOBBE = 'LITEN_MULIGHET_TIL_A_JOBBE'
}

export enum GammelInnsatsgruppe {
    STANDARD_INNSATS = 'STANDARD_INNSATS',
    SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
    SPESIELT_TILPASSET_INNSATS = 'SPESIELT_TILPASSET_INNSATS',
    GRADERT_VARIG_TILPASSET_INNSATS = 'GRADERT_VARIG_TILPASSET_INNSATS',
    VARIG_TILPASSET_INNSATS = 'VARIG_TILPASSET_INNSATS'
}

export enum ArenaKode {
    BATT = 'BATT',
    BFORM = 'BFORM',
    BKART = 'BKART',
    IKVAL = 'IKVAL',
    IVURD = 'IVURD',
    KAP11 = 'KAP11',
    OPPFI = 'OPPFI',
    VARIG = 'VARIG',
    VURDI = 'VURDI',
    VURDU = 'VURDU'
}
