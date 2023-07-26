import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { SealCheckmarkIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const Godkjenninger = ({ godkjenninger }: Pick<ArenaPerson, 'godkjenninger'>) => {
    const godkjenningListe = safeMap(godkjenninger, (godkjenning, index) => (
        <div key={`godkjenninger-${index}`} className="underinformasjon">
            <BodyShort size="small" className="BodyHeader" key={`godkjenninger-${index}`}>
                {godkjenning.tittel}
            </BodyShort>

            <BodyShort size="small">Utsteder: {godkjenning.utsteder ? godkjenning.utsteder : EMDASH}</BodyShort>
            <BodyShort size="small" className="BodyShortItalic">
                Fullført: {formaterDato(godkjenning.gjennomfortDato)}
            </BodyShort>
            {godkjenning.utloperDato && (
                <BodyShort size="small" className="BodyShortItalic">
                    Utløper: {godkjenning.utloperDato ? formaterDato(godkjenning.utloperDato) : EMDASH}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk
            header="Offentlige godkjenninger"
            icon={<SealCheckmarkIcon title="a11y-title" aria-hidden="true" />}
            headerTypo="ingress"
        >
            {godkjenningListe}
        </Informasjonsbolk>
    );
};

export default Godkjenninger;
