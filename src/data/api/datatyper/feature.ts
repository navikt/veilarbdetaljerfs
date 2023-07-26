export const INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE =
    'veilarbdetaljerfs.hent_innsatsgruppe_og_hovedmal_fra_vedtaksstotte';

export const TOGGLES = [INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE];

export interface Features {
    [INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE]: boolean;
}

export const initialFeatures: Features = {
    [INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE]: false
};

export const toggles = () => {
    return `features=${INNSATSGRUPPE_OG_HOVEDMAL_FRA_VEDTAKSSTOTTE}`;
};
