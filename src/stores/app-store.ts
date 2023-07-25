import { useState } from 'react';
import constate from 'constate';
import { initialFeatures } from '../data/api/datatyper/feature';

export const [AppStoreProvider, useAppStore] = constate((initalValues: { fnr: string }) => {
    const [fnr, setFnr] = useState(initalValues.fnr);
    const [features, setFeatures] = useState(initialFeatures);

    return {
        fnr,
        setFnr,
        features,
        setFeatures
    };
});
