import { Panel, Heading } from '@navikt/ds-react';
import { DobbeltInformasjon } from './felles/dobbelinfo';
import { RegistreringsData } from '../data/api/datatyper/registreringsData';
import { useEffect, useState } from 'react';
import { hentRegistrering } from '../data/api/fetch';
import { useAppStore } from '../stores/app-store';
import { Errormelding, Laster } from './felles/minikomkomponenter';
import { StringOrNothing } from '../utils/felles-typer';
import EMDASH from '../utils/emdash';
import { EnkeltInformasjon } from './felles/enkeltInfo';
import { formaterDato } from '../utils/formater';

export const Registrering = () => {
    const { fnr } = useAppStore();
    const [registrering, setRegistrering] = useState<RegistreringsData | null>(null);
    const [lasterData, setLasterData] = useState<boolean>(true);
    const [harFeil, setHarFeil] = useState<boolean>(false);

    useEffect(() => {
        const hentOverblikkData = async () => {
            try {
                setLasterData(true);
                const [_registrering] = await Promise.all([hentRegistrering(fnr)]);
                setRegistrering(_registrering);
            } catch (err) {
                setHarFeil(true);
            } finally {
                setLasterData(false);
            }
        };

        hentOverblikkData();
    }, [fnr]);

    if (lasterData) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Laster />
            </Panel>
        );
    }

    if (harFeil) {
        return (
            <Panel border className="nokkelinfo_panel">
                <Errormelding />
            </Panel>
        );
    }

    const registrertAvNavn: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.navn;
    const registrertAvID: StringOrNothing = registrering?.registrering?.manueltRegistrertAv?.enhet?.id;
    const datoRegistrert: StringOrNothing = registrering?.registrering?.opprettetDato;

    const regDataHvorfor = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'dinSituasjon'
    );
    const hvorforSvar: StringOrNothing = regDataHvorfor?.svar;

    const regDataSisteStilling = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'sisteStilling'
    );
    const sisteStillingSvar: StringOrNothing = regDataSisteStilling?.svar;

    const regDataUtdanning = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanning'
    );
    const UtdanningSvar: StringOrNothing = regDataUtdanning?.svar;

    const regDataUtdanningGodkjent = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningGodkjent'
    );
    const UtdanningGodkjentSvar: StringOrNothing = regDataUtdanningGodkjent?.svar;

    const regDataUtdanningBestatt = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'utdanningBestatt'
    );
    const UtdanningBestattSvar: StringOrNothing = regDataUtdanningBestatt?.svar;

    const regDataHelse = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'helseHinder'
    );
    const HelseSvar: StringOrNothing = regDataHelse?.svar;

    const regDataAnnet = registrering?.registrering?.teksterForBesvarelse.find(
        (item) => item.sporsmalId === 'andreForhold'
    );
    const AnnetSvar: StringOrNothing = regDataAnnet?.svar;

    const regIdNavn = registrertAvID + ', ' + registrertAvNavn;
    const regDato = 'Registrert: ' + formaterDato(datoRegistrert);
    const regAv = 'Registrert av: ' + regIdNavn;

    const regValues = [`${regDato}`, `${regAv}`];

    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="large">
                Registering
            </Heading>
            <span>
                <DobbeltInformasjon header={regAv ? regAv : EMDASH} values={regValues ? regValues : [EMDASH]} />
                <span className="info_container">
                    <EnkeltInformasjon
                        header="Hvorfor registrerer du deg?"
                        value={hvorforSvar ? hvorforSvar : EMDASH}
                    />
                    <EnkeltInformasjon header="Din siste jobb" value={sisteStillingSvar ? sisteStillingSvar : EMDASH} />
                    <EnkeltInformasjon
                        header="Hva er din høyeste fullførte utdanning?"
                        value={UtdanningSvar ? UtdanningSvar : EMDASH}
                    />
                    <EnkeltInformasjon
                        header="Er utdanningen din godkjent i Norge?"
                        value={UtdanningGodkjentSvar ? UtdanningGodkjentSvar : EMDASH}
                    />
                    <EnkeltInformasjon
                        header="Er utdanningen din bestått?"
                        value={UtdanningBestattSvar ? UtdanningBestattSvar : EMDASH}
                    />
                    <EnkeltInformasjon
                        header="Trenger du oppfølging i forbindelse med helseutfordringer?"
                        value={HelseSvar ? HelseSvar : EMDASH}
                    />
                    <EnkeltInformasjon
                        header="Trenger du oppfølging i forbindelse med andre utfordringer?"
                        value={AnnetSvar ? AnnetSvar : EMDASH}
                    />
                </span>
            </span>
        </Panel>
    );
};
