import { useState } from 'react';
import constate from 'constate';

export enum ViewType {
	DETALJER = 'DETALJER'
}

export const [ViewStoreProvider, useViewStore] = constate(() => {
	const [view, setView] = useState<ViewType>(ViewType.DETALJER);
	return { view, changeView: setView };
});
