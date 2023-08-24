import { ArenaPerson, Fagdokumentasjon, FagdokumentType } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { BodyShort } from '@navikt/ds-react';
import { ReactComponent as Fagbrevikon } from './ikoner/fagbrev.svg';

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
                    <BodyShort size="small" className="body_header">
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
        <Informasjonsbolk header="Fagbrev" icon={<Fagbrevikon aria-hidden="true" />} headerTypo="ingress">
            {dokumentasjoner}
        </Informasjonsbolk>
    );
};

export default Fagdokumentasjoner;
