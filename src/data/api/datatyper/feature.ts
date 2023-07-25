export const SPOR_OM_TILBAKEMELDING = 'veilarbmaofs.spor.om.tilbakemelding';
export const INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE =
    'veilarbmaofs.hent_innsatsgruppe_og_hovedmal_fra_vedtaksstotte';

export const TOGGLES = [SPOR_OM_TILBAKEMELDING, INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE];

export interface Features {
    [SPOR_OM_TILBAKEMELDING]: boolean;
    [INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE]: boolean;
}

export const initialFeatures: Features = {
    [SPOR_OM_TILBAKEMELDING]: false,
    [INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE]: false
};

export const toggles = () => {
    return `feature=${SPOR_OM_TILBAKEMELDING}&features=${INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE}`;
};
