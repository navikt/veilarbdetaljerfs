import { ArenaPerson, Fagdokumentasjon, FagdokumentType } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { WrenchIcon } from '@navikt/aksel-icons';
import { BodyShort } from '@navikt/ds-react';

const fagdokumentTypeTilTekst = (fagdokumentType: FagdokumentType): string => {
    switch (fagdokumentType) {
        case FagdokumentType.AUTORISASJON:
            return 'Autorisasjon';
        case FagdokumentType.MESTERBREV:
            return 'Mesterbrev';
        case FagdokumentType.SVENNEBREV_FAGBREV:
            return 'Fagbrev/Svennebrev';
        default:
            return '';
    }
};

const mapFagdokumentasjonerTilViews = (fagdokumentasjoner: Fagdokumentasjon[]) => {
    return (
        fagdokumentasjoner &&
        fagdokumentasjoner.map((fagdokument, idx) => {
            return (
                <div key={`fagdokument-${idx}`} className="underinformasjon">
                    <BodyShort size="small" className="BodyHeader">
                        {fagdokument.tittel}
                    </BodyShort>
                    <BodyShort size="small">{fagdokumentTypeTilTekst(fagdokument.type)}</BodyShort>
                </div>
            );
        })
    );
};

const Fagdokumentasjoner = ({ fagdokumentasjoner }: Pick<ArenaPerson, 'fagdokumentasjoner'>) => {
    const dokumentasjoner =
        fagdokumentasjoner && fagdokumentasjoner.length > 0
            ? mapFagdokumentasjonerTilViews(fagdokumentasjoner)
            : EMDASH;

    return (
        <Informasjonsbolk header="Fagbrev" icon={<WrenchIcon />} headerTypo="ingress">
            {dokumentasjoner}
        </Informasjonsbolk>
    );
};

export default Fagdokumentasjoner;
