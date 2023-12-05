import { ArenaPerson } from '../../data/api/datatyper/arenaperson';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { BodyShort } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';
import Andreikon from './ikoner/andre-godkjenninger.svg?react';
import '../fellesStyling.css';

const AndreGodkjenninger = ({ andreGodkjenninger }: Pick<ArenaPerson, 'andreGodkjenninger'>) => {
    const annenGodkjenningListe = safeMap(andreGodkjenninger, (annenGodkjenning, index) => (
        <div key={`andregodkjenninger-${index}`} className="underinformasjon">
            <BodyShort size="small" className="body_header" key={`andregodkjenninger-${index}`}>
                {annenGodkjenning.tittel}
            </BodyShort>

            <BodyShort size="small">
                Utsteder: {annenGodkjenning.utsteder ? annenGodkjenning.utsteder : EMDASH}
            </BodyShort>
            <BodyShort size="small" className="typografi_dato">
                Fullført: {formaterDato(annenGodkjenning.gjennomfortDato)}
            </BodyShort>
            {annenGodkjenning.utloperDato && (
                <BodyShort size="small" className="typografi_dato">
                    Utløper: {annenGodkjenning.utloperDato ? formaterDato(annenGodkjenning.utloperDato) : EMDASH}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk header="Andre godkjenninger" icon={<Andreikon aria-hidden="true" />} headerTypo="ingress">
            {annenGodkjenningListe}
        </Informasjonsbolk>
    );
};

export default AndreGodkjenninger;
