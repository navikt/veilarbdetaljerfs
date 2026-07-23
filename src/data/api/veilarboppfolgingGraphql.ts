import { GraphqlResponse } from './GraphqlUtils';

export interface OppfolgingsData {
    oppfolgingsEnhet: {
        enhet: {
            id: string;
            navn: string;
            kilde: string;
        };
    };
    brukerStatus: {
        krr: {
            reservertIKrr: boolean;
        };
    };
}

export type OppfolgingsEnhetQueryRequest = ReturnType<typeof veilarboppfolgingGraphqlQuery>;
export type OppfolgingsenhetResponse = GraphqlResponse<OppfolgingsData>;

export const hentOppfolgingsEnhetQuery = `
    query hentOppfolgingsEnhet($fnr: String!) {
        oppfolgingsEnhet(fnr: $fnr) {
            enhet {
                id
                navn
                kilde
            }
        }
        brukerStatus(fnr: $fnr) {
            krr {
                reservertIKrr
            }
        }
    }
`;

export const veilarboppfolgingGraphqlQuery = (fnr: string, query: string) => {
    return {
        query,
        variables: {
            fnr
        }
    };
};
