import { Alert, Link } from '@navikt/ds-react';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomponenter';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { isNotEmptyArray } from '../utils/felles-typer';
import { useYtelser } from '../data/api/fetch';
import Informasjonsbolk from './felles/informasjonsbolk';
import { formaterDato } from '../utils/formater.ts';
import { lagModiaPersonoversiktLenke } from '../utils';

const Ytelsesinnhold = () => {
    const { fnr } = useAppStore();

    const { data: ytelserData, error: ytelserError, isLoading: ytelserLoading } = useYtelser(fnr);
    const modiaPersonoversiktLenke = lagModiaPersonoversiktLenke();

    if (ytelserLoading) {
        return <Laster />;
    }

    if (!ytelserData || !isNotEmptyArray(ytelserData?.vedtak)) {
        return (
            <Alert inline variant="info" size="small">
                Ingen Arena-ytelser registrert.
            </Alert>
        );
    }

    if (ytelserError) {
        return <Errormelding />;
    }

    return (
        <>
            <span className="info_container">
                <Alert variant="info" size="small">
                    Viser kun ytelsesvedtak gjort i Arena (AAP, tiltakspenger, og dagpenger).{' '}
                    <Link href={modiaPersonoversiktLenke} target="_blank" rel="noopener">
                        Sjekk modia personoversikt.
                    </Link>
                </Alert>
                {ytelserData?.vedtak.map((vedtaket, index) => (
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
                ))}
            </span>
        </>
    );
};

export default Ytelsesinnhold;
