import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import './overblikk.css';
import hentVeileder from '../data/api/hentVeileder';
import { VeilederData } from '../data/api/datatyper/veileder';
import { useAppStore } from '../stores/app-store';
import hentOppfolgingsstatus from '../data/api/hentOppfølgingsstatus';
import { OppfolgingsstatusData } from '../data/api/datatyper/oppfolgingsstatus';
import VeilederInfo from './paneler/veilderInfo';
import PersonTlf from './paneler/personTlf';
import PersonBarn from './paneler/personBarn';
import PersonSivilstand from './paneler/personSivilstand';
import PersonGeoEnhet from './paneler/personGeoEnhet';
import PersonMalform from './paneler/personMalfrom';
import OppfolgningEnhet from './paneler/oppfolgingEnhet';
import OppfolgningMal from './paneler/oppfolgingMal';
import Tolk from './paneler/tolk';
import Registrert from './paneler/registert';
import RegistrertAv from './paneler/registertAv';
import Ytelser from './paneler/ytelser';
import { useEffect, useState } from 'react';

const Overblikk = () => {
    const { fnr } = useAppStore();
    const [veileder, setVeileder] = useState<VeilederData>();
    const [oppfolgingsstatus, setOppfolingsstatus] = useState<OppfolgingsstatusData>();

    useEffect(() => {
        if (fnr != null) {
            hentOppfolgingsstatus(fnr).then((data) => {
                setOppfolingsstatus(data);
            });
        }
    }, [fnr]);

    useEffect(() => {
        if (oppfolgingsstatus?.veilederId != null) {
            hentVeileder(oppfolgingsstatus?.veilederId).then((data) => {
                setVeileder(data);
            });
        }
    }, [oppfolgingsstatus?.veilederId]);

    return (
        <Panel border className="Panel">
            <Heading spacing level="2" size="large">
                Overblikk
            </Heading>
            <BodyLong className="overblikkContainer">
                <h3>Veileder: {veileder?.navn} </h3>
                <PersonTlf />
                <PersonBarn />
                <VeilederInfo />
                <OppfolgningEnhet />
                <RegistrertAv />
                <Tolk />
                <PersonSivilstand />
                <OppfolgningMal />
                <Ytelser />
                <PersonGeoEnhet />
                <Registrert />
                <PersonMalform />
            </BodyLong>
        </Panel>
    );
};

export default Overblikk;
