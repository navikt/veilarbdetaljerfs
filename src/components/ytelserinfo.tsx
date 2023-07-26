import { Panel, Heading, Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { isNotEmptyArray } from '../utils/felles-typer';
import { useYtelser } from '../data/api/fetch';

export const Ytelser = () => {
    const { fnr } = useAppStore();

    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);

    if (ytelserLoading) {
        return (
            <Panel border className="info_panel">
                <Laster />
            </Panel>
        );
    }

    if (!ytelserData || !isNotEmptyArray(ytelserData?.vedtaksliste)) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="panel_header">
                    Ytelser
                </Heading>
                <Alert inline variant="info">
                    Ingen ytelser registrert
                </Alert>
            </Panel>
        );
    }

    if (ytelserError) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="panel_header">
                    Ytelser
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="medium" className="panel_header">
                Ytelser
            </Heading>
            <span className="info_container">
                {ytelserData?.vedtaksliste.map((vedtak, index) => (
                    <div key={index}>
                        <Heading spacing level="2" size="small">
                            {vedtak.vedtakstype || EMDASH}
                        </Heading>
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
