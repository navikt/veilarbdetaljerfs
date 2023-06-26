import { BodyLong, Heading, Panel } from "@navikt/ds-react";
import {useState, useEffect } from "react";
import "./overblikk.css"
import hentVeileder from "../data/api/hentVeileder";
import { VeilederData } from "../data/api/datatyper/veileder";
import hentPersonalia from "../data/api/hentPersonalia";
import { PersonaliaV2Info } from "../data/api/datatyper/personalia";
import { OppfolgingsstatusData } from "../data/api/datatyper/oppfolgingsstatus";
import { OrdinaerRegistrering, RegistreringsData } from "../data/api/datatyper/registreringsData";
import hentOppfolgning from "../data/api/hentOppfolgning";
import hentRegistrering from "../data/api/hentRegistrering";
import { YtelseData } from "../data/api/datatyper/ytelse";
import hentYtelser from "../data/api/hentYtelser";
import { TilrettelagtKommunikasjonData } from "../data/api/datatyper/tilrettelagtKommunikasjon";
import hentTolk from "../data/api/hentTolk";


const Overblikk = () => {

    const [veileder, setVeileder] = useState<VeilederData | null>(null);
    const [person, setPerson] = useState<PersonaliaV2Info | null>(null);
    const [oppfolgning, setOppfolgning] = useState<OppfolgingsstatusData | null>(null);
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [ytelser, setYtelser] = useState<YtelseData | null>(null);
    const [tolk, setTolk] = useState<TilrettelagtKommunikasjonData | null>(null);


    useEffect(() => {
      hentVeileder('Z123456').then(data => {
        setVeileder(data)
      });
    },[]);

    useEffect(() => {
      hentPersonalia('10108000398').then(data => {
        setPerson(data)
      });
    },[]);

    useEffect(() => {
      hentOppfolgning('10108000398').then(data => {
        setOppfolgning(data)
      });
    },[]);
    useEffect(() => {
      hentRegistrering('10108000398').then(data => {
        setRegistrering(data)
      });
    },[]);
    useEffect(() => {
      hentYtelser('10108000398').then(data => {
        setYtelser(data)
      });
    },[]);
    useEffect(() => {
      hentTolk('10108000398').then(data => {
        setTolk(data)
      });
    },[]);
    

  return (
    <Panel border  className="Panel">
      <Heading spacing level="2" size="large" >
        Overblikk
      </Heading>
      <BodyLong className="overblikkContainer">
        <div>
        <h3>Telefon: </h3>
        <p>{person?.telefon?.[0]?.telefonNr}</p>
        </div>
        <div>
        <h3>Barn fødsesldato: </h3>
        <p>{person?.barn?.[0]?.fodselsdato}</p>
        </div>
        <div>
        <h3>Veileder: </h3>
        <p>{veileder?.navn}</p>
        </div>
        <div>
        <h3>Oppfølgningsenhet: </h3>
        <p>{oppfolgning?.oppfolgingsenhet?.enhetId} {oppfolgning?.oppfolgingsenhet?.navn}</p>
        </div>
        <div>
        <h3>Registrert av: </h3>
        <p>{registrering?.registrering?.manueltRegistrertAv?.enhet?.navn}</p>
        </div>
        <div>
        <h3>Tilrettelagt kommunikasjon</h3>
        <p>{tolk?.talespraak}</p>
        </div>
        
        <div>
        <h3>Sivilstatus: </h3>
        <p>{person?.sivilstandliste?.[0]?.sivilstand}</p>
        </div>
        
        <div>
        <h3>Brukers mål: </h3>
        <p>{oppfolgning?.hovedmaalkode}</p>
        </div>
        <div>
        <h3>Ytelse(r): </h3>
        <p>{ytelser?.vedtaksliste?.[0]?.aktivitetsfase}</p>
        </div>
        <div>
        <h3>Geografisk enhet: </h3>
        <p>{person?.geografiskEnhet?.enhetsnummer} {person?.geografiskEnhet?.navn}</p>
        </div>
        <div>
        <h3>Registrert: </h3>
        <p>{registrering?.registrering?.opprettetDato}</p>
        </div>
        <div>
        <h3>Språk: </h3>
        <p>{person?.malform}</p>
        </div>
      </BodyLong>
    </Panel>
  );
};


export default Overblikk