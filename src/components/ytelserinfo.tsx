import { Panel, Heading, Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { isNotEmptyArray } from '../utils/felles-typer';
import { useYtelser } from '../data/api/fetchv2';

export const Ytelser = () => {
    const { fnr } = useAppStore();

    const ytelser = useYtelser(fnr);

    if (ytelser.isLoading) {
        return (
            <Panel border className="info_panel" tabIndex={7}>
                <Laster />
            </Panel>
        );
    }

    if (!ytelser.data || !isNotEmptyArray(ytelser.data?.vedtaksliste)) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Ytelser
                </Heading>
                <Alert inline variant="info">
                    Ingen ytelser registrert
                </Alert>
            </Panel>
        );
    }

    if (ytelser.error) {
        return (
            <Panel border className="info_panel" tabIndex={7}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Ytelser
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel" tabIndex={7}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Ytelser
            </Heading>
            <span className="info_container">
                {ytelser?.data?.vedtaksliste.map((vedtak, index) => (
                    <div key={index}>
                        <EnkeltInformasjon header="Vedtakstype" value={vedtak.vedtakstype || EMDASH} />
                        <EnkeltInformasjon header="Vedtakstatus" value={vedtak.status || EMDASH} />
                        <EnkeltInformasjon header={'Aktivitetsfase'} value={vedtak.aktivitetsfase || EMDASH} />
                        <EnkeltInformasjon
                            header="Fradato / Tildato"
                            value={`${vedtak.fradato.day}.${vedtak.fradato.month}.${vedtak.fradato.year} - ${
                                vedtak.tildato
                                    ? `${vedtak.tildato.day}.${vedtak.tildato.month}.${vedtak.tildato.year}`
                                    : 'Ingen tildato'
                            }`}
                        />
                    </div>
                ))}
            </span>
        </Panel>
    );
};
