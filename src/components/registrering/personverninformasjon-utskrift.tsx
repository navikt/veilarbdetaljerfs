import { useState } from 'react';
import { Button, Modal } from '@navikt/ds-react';
import PersonverninformasjonSykmeldt from './personverninformasjon-sykmeldt';
import PersonverninformasjonManuell from './personverninformasjon-manuell';
import { PrinterSmallIcon } from '@navikt/aksel-icons';
import { RegistreringType } from '../../data/api/datatyper/registreringsData';
import { PrintKnappModal } from './print-knapp-modal';
import './registrering.css';

function erSykmeldt(type?: RegistreringType) {
    return type && type === 'SYKMELDT';
}

function erOrdinaer(type?: RegistreringType) {
    return type && type === 'ORDINAER';
}

function PersonverninformasjonUtskrift(props: { type?: RegistreringType }) {
    const [visPrintModal, setVisPrintModal] = useState<boolean>(false);

    return (
        <>
            <Button
                variant="tertiary"
                onClick={() => setVisPrintModal(true)}
                type="button"
                className="utskrift_knapp"
                icon={<PrinterSmallIcon title="Ikon som illustrerer en skriver" aria-hidden="true" />}
            >
                Personverninformasjon, rettigheter og plikter
            </Button>
            <Modal className="personvern_modal" open={visPrintModal} onClose={() => setVisPrintModal(false)}>
                <PrintKnappModal />
                {erSykmeldt(props.type) && <PersonverninformasjonSykmeldt />}
                {erOrdinaer(props.type) && <PersonverninformasjonManuell />}
            </Modal>
        </>
    );
}

export default PersonverninformasjonUtskrift;
