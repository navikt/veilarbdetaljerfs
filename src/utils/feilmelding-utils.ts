import { ErrorMessage } from '../data/api/fetch.ts';

/*
 * Grunnen til at vi henter ut kun den første korrelasjonsId-en er for å unngå å vise veldig mange feilkoder til brukeren, som ikke er hensiktsmessig.
 * Dessuten holder det trolig med en korrelasjonsId ifm. feilsøking. I skrivende stund holder det å putte inn en korrelasjonsId i Kibana og deretter
 * utlede f.eks. "x_userId" og heller filtrere på denne i Kibana for å få et komplett bilde dersom det skulle vise seg at flere API-kall har feilet samtidig.
 */
export const getForsteKorrelasjonsIdEllerNull = (errorMessages: (ErrorMessage | undefined)[]) => {
    return (
        errorMessages
            .map((errorMessage) => errorMessage?.korrelasjonsId)
            .filter(
                (korrelasjonsId) => korrelasjonsId !== undefined && korrelasjonsId !== null && korrelasjonsId.length > 0
            )[0] ?? null
    );
};
