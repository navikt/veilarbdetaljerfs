import { ArenaPerson } from '../../data/api/datatyper/arenaperson';

import Informasjonsbolk from '../felles/informasjonsbolk';
import { formaterDato } from '../../utils/formater';
import { safeMap } from '../../utils';
import { FolderPlusIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';
import EMDASH from '../../utils/emdash';

const AndreGodkjenninger = ({ andreGodkjenninger }: Pick<ArenaPerson, 'andreGodkjenninger'>) => {
    const annenGodkjenningListe = safeMap(andreGodkjenninger, (annenGodkjenning, index) => (
        <div key={`andregodkjenninger-${index}`} className="underinformasjon">
            <Label size="small" as="p" key={`andregodkjenninger-${index}`}>
                {annenGodkjenning.tittel}
            </Label>

            <BodyShort>Utsteder: {annenGodkjenning.utsteder ? annenGodkjenning.utsteder : EMDASH}</BodyShort>
            <BodyShort>Fullført: {formaterDato(annenGodkjenning.gjennomfortDato)}</BodyShort>
            {annenGodkjenning.utloperDato && (
                <BodyShort>
                    Utløper: {annenGodkjenning.utloperDato ? formaterDato(annenGodkjenning.utloperDato) : EMDASH}
                </BodyShort>
            )}
        </div>
    ));

    return (
        <Informasjonsbolk header="Andre godkjenninger" icon={<FolderPlusIcon />} headerTypo="ingress">
            {annenGodkjenningListe}
        </Informasjonsbolk>
    );
};

export default AndreGodkjenninger;
