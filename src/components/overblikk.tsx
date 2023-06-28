import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import "./overblikk.css"
import VeilederInfo from "./paneler/veilderInfo";
import PersonTlf from "./paneler/personTlf";
import PersonBarn from "./paneler/personBarn";
import PersonSivilstand from "./paneler/personSivilstand";
import PersonGeoEnhet from "./paneler/personGeoEnhet";
import PersonMalform from "./paneler/personMalfrom";
import OppfolgningEnhet from "./paneler/oppfolgingEnhet";
import OppfolgningMal from "./paneler/oppfolgingMal";
import Tolk from "./paneler/tolk";
import Registrert from "./paneler/registert";
import RegistrertAv from "./paneler/registertAv";
import Ytelser from "./paneler/ytelser";


const Overblikk = () => {
    return (
        <Panel border className="Panel">
            <Heading spacing level="2" size="large" >
                Overblikk
            </Heading>
            <BodyLong className="overblikkContainer">
                <PersonTlf/>
                <PersonBarn/>
                <VeilederInfo/>
                <OppfolgningEnhet/>
                <RegistrertAv/>
                <Tolk/>
                <PersonSivilstand/>
                <OppfolgningMal/>
                <Ytelser/>
                <PersonGeoEnhet/>
                <Registrert/>
                <PersonMalform/>
            </BodyLong>
        </Panel>
    );
};


export default Overblikk