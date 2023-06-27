import { useEffect, useState } from 'react';
import { VeilederData } from "../../data/api/datatyper/veileder";
import hentVeileder from "../../data/api/hentVeileder";

const VeilederInfo = () => {
    const [veileder, setVeileder] = useState<VeilederData | null>(null);

    useEffect(() => {
      hentVeileder('Z123456').then((data) => {
        setVeileder(data);
      });
    }, []);
  
    return (
    <dl>
      <dt className='overblikkTittel'>Veileder </dt>
      <dd className='overblikkUndertittel'>{veileder?.navn}</dd>
    </dl>
    );
};

export default VeilederInfo;
