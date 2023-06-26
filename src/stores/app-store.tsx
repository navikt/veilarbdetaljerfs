import { useState } from 'react';
import constate from 'constate';

export const [AppStoreProvider, useAppStore] = constate(
	(initalValues: { fnr: String }) => {
		const [fnr, setFnr] = useState(initalValues.fnr);


		return {
			fnr,
			setFnr,
		};
	}
);
