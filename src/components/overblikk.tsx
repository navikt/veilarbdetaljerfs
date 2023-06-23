import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import "./overblikk.css"


const Overblikk = () => {
  return (
    <Panel border  className="Panel">
      <Heading spacing level="2" size="large">
        Overblikk
      </Heading>
      <BodyLong>
        <h3>Navn:</h3>
        <p>Dream team</p>
      </BodyLong>
    </Panel>
  );
};

export default Overblikk