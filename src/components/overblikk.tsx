import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import { useState, useEffect } from 'react';
import './overblikk.css';
import hentVeileder from '../data/api/hentVeileder';
import { VeilederData } from '../data/api/datatyper/veileder';

const Overblikk = () => {
    const [veileder, setVeileder] = useState(0);

    useEffect(() => {
        hentVeileder('Z123456').then((data) => {
            setVeileder(data);
        });
    }, []);

    return (
        <Panel border className="Panel">
            <Heading spacing level="2" size="large">
                Overblikk
            </Heading>
            <BodyLong>
                <h3>Veileder: {veileder.navn} </h3>
            </BodyLong>
        </Panel>
    );
};

export default Overblikk;
