import { GraphqlResponse } from './GraphqlUtils';

export interface OppfolgingsEnhetData {
    enhet: {
        id: string;
        navn: string;
        kilde: string;
    };
}

export type OppfolgingsEnhetQueryRequest = ReturnType<typeof veilarboppfolgingGraphqlQuery>;
export type OppfolgingsenhetResponse = GraphqlResponse<{ oppfolgingsEnhet: OppfolgingsEnhetData }>;

export const hentOppfolgingsEnhetQuery = `
    query hentOppfolgingsEnhet($fnr: String!) {
        oppfolgingsEnhet(fnr: $fnr) {
            enhet {
                id
                navn
                kilde
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
