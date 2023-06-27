import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import {useState, useEffect } from "react";
import "./overblikk.css"
import hentVeileder from "../data/api/hentVeileder";
import { VeilederData } from "../data/api/datatyper/veileder";
import { useAppStore } from "../stores/app-store";
import hentOppfolgingsstatus from "../data/api/hentOppfølgingsstatus";
import { OppfolgingsstatusData } from "../data/api/datatyper/oppfolgingsstatus";



const Overblikk = () => {

    const { fnr } = useAppStore()
    const [veileder, setVeileder] = useState<VeilederData>()
    const [oppfolgingsstatus, setOppfolingsstatus] = useState<OppfolgingsstatusData>()

    useEffect(() => {
      if (fnr != null) {
        hentOppfolgingsstatus(fnr).then(data => {
          setOppfolingsstatus(data)
        });
      }
    },[fnr]);
  

    useEffect(() => {
      if (oppfolgingsstatus?.veilederId != null) {
        hentVeileder(oppfolgingsstatus?.veilederId).then(data => {
          setVeileder(data)
        });
      }
    },[oppfolgingsstatus?.veilederId]);
    

  return (
    <Panel border  className="Panel">
      <Heading spacing level="2" size="large">
        Overblikk
      </Heading>
      <BodyLong>
        <h3>Veileder: {veileder?.navn} </h3>
      </BodyLong>
    </Panel>
  );
};

export default Overblikk;
