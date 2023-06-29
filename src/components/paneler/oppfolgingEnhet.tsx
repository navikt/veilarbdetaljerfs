import { useEffect, useState } from 'react';
import { OppfolgingsstatusData } from '../../data/api/datatyper/oppfolgingsstatus';
import { hentOppfolgingsstatus } from '../../data/api/fetch';

const OppfolgingEnhet = () => {
    const [oppfolging, setOppfolging] = useState<OppfolgingsstatusData | null>(null);

    useEffect(() => {
        hentOppfolgingsstatus('10108000398').then((data) => {
            setOppfolging(data);
        });
    }, []);

    return (
        <div>
            <h3>Oppfølgingsenhet: </h3>
            <p>
                {oppfolging?.oppfolgingsenhet?.enhetId} {oppfolging?.oppfolgingsenhet?.navn}
            </p>
        </div>
    );
};

export default OppfolgingEnhet;
