import { GraphqlResponse } from './GraphqlUtils';

export const oppfolgingsEnhetQueryDto = `
    query Oppfolgingsstatus($fnr: String!) {
        enhet(ident: $ident) {
            id
            navn
            kilde
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

export type oppfolgingsenhetRespone = GraphqlResponse<{ OppfolgingsEnhetData: OppfolgingsEnhetData }>;

export interface OppfolgingsEnhetData {
    enhet: {
        id: string;
        navn: string;
        kilde: string;
    };
}

export type OppfolgingsEnhetQueryDto = ReturnType<typeof veilarboppfolgingGraphqlQuery>;
