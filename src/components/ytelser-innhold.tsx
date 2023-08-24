import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { isNotEmptyArray } from '../utils/felles-typer';
import { useYtelser } from '../data/api/fetch';
import Informasjonsbolk from './felles/informasjonsbolk';

const Ytelsesinnhold = () => {
    const { fnr } = useAppStore();

    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);

    if (ytelserLoading) {
        return <Laster />;
    }

    if (!ytelserData || !isNotEmptyArray(ytelserData?.vedtaksliste)) {
        return (
            <Alert inline variant="info">
                Ingen ytelser registrert
            </Alert>
        );
    }

    if (ytelserError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                {ytelserData?.vedtaksliste.map((vedtak, index) => (
                    <div key={index}>
                        <Informasjonsbolk
                            header={vedtak.vedtakstype || EMDASH}
                            headerTypo="ingress"
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
