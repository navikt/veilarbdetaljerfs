import { ArenaPerson, SprakNiva } from '../../data/api/datatyper/arenaperson';
import CvInfo from '../felles/cvinfo';
import { safeMap } from '../../utils';
import { Chat2Icon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';

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
            <Label size="small" as="p">
                {enkeltSprak.sprak}
            </Label>
            <BodyShort>Muntlig: {mapSprakNivaTilTekst(enkeltSprak.muntligNiva)}</BodyShort>
            <BodyShort>Skriftlig: {mapSprakNivaTilTekst(enkeltSprak.skriftligNiva)}</BodyShort>
        </div>
    ));

    return (
        <CvInfo header="Språk" icon={<Chat2Icon />}>
            {mappedSprak}
        </CvInfo>
    );
};

export default Sprak;
