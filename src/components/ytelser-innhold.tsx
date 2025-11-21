import { Alert } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { useYtelser } from '../data/api/fetch';
import Informasjonsbolk from './felles/informasjonsbolk';
import { formaterDato } from '../utils/formater.ts';
import { isNotEmptyArray } from '../utils/felles-typer.ts';
import { ModiaPersonoversiktLenke } from './modia-personoversikt-lenke.tsx';

const Ytelsesinnhold = () => {
    const { fnr } = useAppStore();
    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);

    if (ytelserLoading) {
        return <Laster />;
    }

    const harIngenArenaYtelser = !ytelserData || !isNotEmptyArray(ytelserData?.vedtak);

    if (ytelserError) {
        return <Errormelding />;
    }

    return (
        <>
            <Alert variant="info" size="small" className="alert_container">
                Viser kun ytelsesvedtak gjort i Arena (AAP, tiltakspenger, og dagpenger). <ModiaPersonoversiktLenke />
            </Alert>
            <span className="info_container">
                {harIngenArenaYtelser ? (
                    <Alert inline variant="info" size="small">
                        Ingen Arena-ytelser registrert.
                    </Alert>
                ) : (
                    ytelserData?.vedtak.map((vedtaket, index) => (
                        <div key={index}>
                            <Informasjonsbolk header={vedtaket.type || EMDASH} headerTypo="ingress">
                                <EnkeltInformasjon header="Vedtakstatus" value={vedtaket.status || EMDASH} />
                                <EnkeltInformasjon header="Aktivitetsfase" value={vedtaket.aktivitetsfase || EMDASH} />
                                <EnkeltInformasjon
                                    header="Fra dato / Til dato"
                                    value={`                       
                                ${vedtaket.fraDato ? `${formaterDato(vedtaket.fraDato)}` : 'Ingen fra-dato'} – ${
                                    vedtaket.tilDato ? `${formaterDato(vedtaket.tilDato)}` : 'Ingen til-dato'
                                }`}
                                />
                            </Informasjonsbolk>
                        </div>
                    ))
                )}
            </span>
        </>
    );
};

export default Ytelsesinnhold;
