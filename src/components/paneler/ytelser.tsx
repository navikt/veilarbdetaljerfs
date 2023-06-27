import { useEffect, useState } from 'react';
import hentYtelser from '../../data/api/hentYtelser';
import { YtelseData } from '../../data/api/datatyper/ytelse';
import React from 'react';

const Ytelser = () => {
  const [ytelser, setYtelser] = useState<YtelseData | null>(null);

    useEffect(() => {
      hentYtelser('10108000398').then(data => {
        setYtelser(data)
      });
    },[]);

  return (
    <div>
        <h3>Ytelse(r): </h3>
        <p>{ytelser?.vedtaksliste?.[0]?.aktivitetsfase}</p>
        </div>
  );
  
};

export default Ytelser;

