import { useState } from 'react';
import { Button, Modal } from '@navikt/ds-react';
import PersonverninformasjonSykmeldt from './sykemeldtregistrering/personverninformasjon-sykmeldt';
import PersonverninformasjonManuell from './arbeidssoekerregistrering/personverninformasjon-manuell';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { PrintKnappModal } from './print-knapp-modal';
import { trackAmplitude } from '../../amplitude/amplitude';

function erSykmeldt(type: string) {
    return type === 'SYKMELDT';
}

function erOrdinaer(type: string) {
    return type === 'ORDINAER';
}

interface Props {
    type: 'ORDINAER' | 'SYKMELDT';
}

function PersonverninformasjonUtskrift({ type }: Props) {
    const [visPrintModal, setVisPrintModal] = useState<boolean>(false);
    const handleBtnClick = () => {
        trackAmplitude({ name: 'modal åpnet', data: { tekst: 'Personverninformasjon, rettigheter og plikter' } });
        setVisPrintModal(true);
    };
    return (
        <>
            <Button
                variant="tertiary"
                onClick={handleBtnClick}
                type="button"
                icon={<PrinterSmallIcon title="Ikon som illustrerer en skriver" aria-hidden="true" />}
            >
                Personverninformasjon, rettigheter og plikter
            </Button>
            <Modal open={visPrintModal} onClose={() => setVisPrintModal(false)} aria-label="Personverninfo-modal">
                <Modal.Header>
                    <PrintKnappModal />
                </Modal.Header>
                <Modal.Body>
                    {erSykmeldt(type) && <PersonverninformasjonSykmeldt />}
                    {erOrdinaer(type) && <PersonverninformasjonManuell />}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default PersonverninformasjonUtskrift;
