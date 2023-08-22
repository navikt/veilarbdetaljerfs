import { Heading, Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { isNotEmptyArray } from '../utils/felles-typer';
import { useYtelser } from '../data/api/fetch';
import { WalletIcon } from '@navikt/aksel-icons';
import Informasjonsbolk from './felles/informasjonsbolk';

const Ytelsesinnhold = () => {
    const { fnr } = useAppStore();

    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);

    if (ytelserLoading) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Ytelser
                </Heading>
                <Laster />
            </>
        );
    }

    if (!ytelserData || !isNotEmptyArray(ytelserData?.vedtaksliste)) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Ytelser
                </Heading>
                <Alert inline variant="info">
                    Ingen ytelser registrert
                </Alert>
            </>
        );
    }

    if (ytelserError) {
        return (
            <>
                <Heading spacing level="2" size="medium" className="panel_header">
                    Ytelser
                </Heading>
                <Errormelding />
            </>
        );
    }

    return (
        <>
            <Heading spacing level="2" size="medium" className="panel_header">
                Ytelser
            </Heading>
            <span className="info_container">
                {ytelserData?.vedtaksliste.map((vedtak, index) => (
                    <div key={index}>
                        <Informasjonsbolk
                            header={vedtak.vedtakstype || EMDASH}
                            headerTypo="ingress"
                            icon={<WalletIcon title="Ikon som illustrerer en lommebok" aria-hidden="true" />}
                        >
                            <EnkeltInformasjon header="Vedtakstatus" value={vedtak.status || EMDASH} />
                            <EnkeltInformasjon header="Aktivitetsfase" value={vedtak.aktivitetsfase || EMDASH} />
                            <EnkeltInformasjon
                                header="Fra dato / Til dato"
                                value={`${vedtak.fradato.day}.${vedtak.fradato.month}.${vedtak.fradato.year} - ${
                                    vedtak.tildato
                                        ? `${vedtak.tildato.day}.${vedtak.tildato.month}.${vedtak.tildato.year}`
                                        : 'Ingen tildato'
                                }`}
                            />
                        </Informasjonsbolk>
                    </div>
                ))}
            </span>
        </>
    );
};

export default Ytelsesinnhold;
