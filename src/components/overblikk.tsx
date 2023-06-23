import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import "./overblikk.css"
import hentVeileder from "../data/api/hentVeileder";
import { VeilederData } from "../data/datatyper/veileder";


const Overblikk = () => {

  const ident = hentVeileder('Z123456')
  console.log(ident)

  return (
    <Panel border  className="Panel">
      <Heading spacing level="2" size="large">
        Overblikk
      </Heading>
      <BodyLong>
        <h3>Veileder:</h3>
      </BodyLong>
    </Panel>
  );
};


export default Overblikk