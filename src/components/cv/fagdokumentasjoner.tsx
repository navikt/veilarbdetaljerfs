import { ArenaPerson, Fagdokumentasjon, FagdokumentType } from '../../data/api/datatyper/arenaperson';
import EMDASH from '../../utils/emdash';
import CvInfo from '../felles/cvinfo';
import { WrenchIcon } from '@navikt/aksel-icons';
import { BodyShort, Label } from '@navikt/ds-react';

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
                    <Label size="small" as="p">
                        {fagdokument.tittel}
                    </Label>
                    <BodyShort>{fagdokumentTypeTilTekst(fagdokument.type)}</BodyShort>
                </div>
            );
        })
    );
};

const Fagdokumentasjoner = (props: Pick<ArenaPerson, 'fagdokumentasjoner'>) => {
    const { fagdokumentasjoner } = props;
    const dokumentasjoner =
        fagdokumentasjoner && fagdokumentasjoner.length > 0
            ? mapFagdokumentasjonerTilViews(fagdokumentasjoner)
            : EMDASH;

    return (
        <CvInfo header="Fagbrev" icon={<WrenchIcon />}>
            {dokumentasjoner}
        </CvInfo>
    );
};

export default Fagdokumentasjoner;
