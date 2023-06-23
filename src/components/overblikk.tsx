import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import "./overblikk.css"
import hentVeileder from "../data/api/hentVeileder";
import { VeilederData } from "../data/datatyper/veileder";


const Overblikk = () => {


//   Fix async/await, promise stuff with this function
  const ident = hentVeileder('Z123456')
//   .then(data => {
//     console.log("HERE 1", data)
//   })


//   .then(function(result){
//     console.log(result)
//   })
//   console.log("HERE 2", ident)


//   ident.then(function(result) {
//     console.log("HERE 3", result);
//   })

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