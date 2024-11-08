import { ErrorMessage } from '../data/api/fetch.ts';

export const getForsteKorrelasjonsIdEllerNull = (errorMessages: (ErrorMessage | undefined)[]) => {
    return (
        errorMessages
            .map((errorMessage) => errorMessage?.korrelasjonsId)
            .filter(
                (korrelasjonsId) => korrelasjonsId !== undefined && korrelasjonsId !== null && korrelasjonsId.length > 0
            )[0] ?? null
    );
};
