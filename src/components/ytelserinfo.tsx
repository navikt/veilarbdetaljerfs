import { Panel, Heading, BodyShort, Alert } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { hentYtelser } from '../data/api/fetch';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { YtelseData } from '../data/api/datatyper/ytelse';
import { isNotEmptyArray } from '../utils/felles-typer';

export const Ytelser = () => {
    const { fnr } = useAppStore();
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);
    const [lasterYtelserdata, setLasterYtelserdata] = useState<boolean>(true);
    const [ytelserHarFeil, setYtelserHarFeil] = useState<boolean>(false);

    useEffect(() => {
        const hentYtelserData = async () => {
            try {
                setLasterYtelserdata(true);
                const _ytelser = await hentYtelser(fnr);
                setYtelser(_ytelser);
            } catch (err) {
                setYtelserHarFeil(true);
            } finally {
                setLasterYtelserdata(false);
            }
        };

        hentYtelserData();
    }, [fnr]);

    if (lasterYtelserdata) {
        return (
            <Panel border className="info_panel" tabIndex={7}>
                <Laster />
            </Panel>
        );
    }

    if (ytelserHarFeil) {
        return (
            <Panel border className="info_panel" tabIndex={7}>
                <Heading spacing level="2" size="medium" className="PanelHeader">
                    Ytelser
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    if (!ytelser || !isNotEmptyArray(ytelser.vedtaksliste)) {
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
    return (
        <Panel border className="info_panel" tabIndex={7}>
            <Heading spacing level="2" size="medium" className="PanelHeader">
                Ytelser
            </Heading>
            <span className="info_container">
                {ytelser?.vedtaksliste.map((vedtak, index) => (
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
