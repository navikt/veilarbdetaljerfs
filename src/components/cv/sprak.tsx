import { ArenaPerson, SprakNiva } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { safeMap } from '../../utils';
import { BodyShort } from '@navikt/ds-react';
import Sprakikon from './ikoner/sprak.svg?react';

// String er lagt til for bakoverkompatibilitet
function mapSprakNivaTilTekst(sprakNiva: SprakNiva | string): string {
    switch (sprakNiva) {
        case SprakNiva.FOERSTESPRAAK:
            return 'Førstespråk (morsmål)';
        case SprakNiva.VELDIG_GODT:
            return 'Veldig godt';
        case SprakNiva.GODT:
            return 'Godt';
        case SprakNiva.NYBEGYNNER:
            return 'Nybegynner';
        case SprakNiva.IKKE_OPPGITT:
            return 'Ikke oppgitt';
    }

    return sprakNiva;
}

const Sprak = ({ sprak }: Pick<ArenaPerson, 'sprak'>) => {
    const mappedSprak = safeMap(sprak, (enkeltSprak, index) => (
        <div key={`kompetanse-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header">
                {enkeltSprak.sprak}
            </BodyShort>
            <BodyShort size="small">Muntlig: {mapSprakNivaTilTekst(enkeltSprak.muntligNiva)}</BodyShort>
            <BodyShort size="small">Skriftlig: {mapSprakNivaTilTekst(enkeltSprak.skriftligNiva)}</BodyShort>
        </div>
    ));

    return (
        <Informasjonsbolk header="Språk" icon={<Sprakikon aria-hidden="true" />} headerTypo="ingress">
            {mappedSprak}
        </Informasjonsbolk>
    );
};

export default Sprak;
