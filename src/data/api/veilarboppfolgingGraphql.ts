import { GraphqlResponse } from './GraphqlUtils';

export interface Oppfolgingsdata {
    oppfolgingsEnhet: {
        enhet: {
            id: string;
            navn: string;
        };
    };
    brukerStatus: {
        krr: {
            reservertIKrr: boolean;
        };
        veilederTilordning: {
            veilederIdent: string | null;
        } | null;
    };
}

export type OppfolgingsdataQueryRequest = ReturnType<typeof veilarboppfolgingGraphqlQuery>;
export type OppfolgingsdataResponse = GraphqlResponse<Oppfolgingsdata>;

export const hentOppfolgingsdataQuery = `
    query hentOppfolgingsdata($fnr: String!) {
        oppfolgingsEnhet(fnr: $fnr) {
            enhet {
                id
                navn
            }
        }
        brukerStatus(fnr: $fnr) {
            krr {
                reservertIKrr
            }
            veilederTilordning {
                veilederIdent
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
