import { Heading, Panel } from '@navikt/ds-react';
import { TilrettelagtKommunikasjonData } from '../../data/api/datatyper/tilrettelagtKommunikasjon';
import { usePersonalia, useTolk } from '../../data/api/fetch';
import { useAppStore } from '../../stores/app-store';
import { OrNothing } from '../../utils/felles-typer';
import Informasjonsbolk from '../felles/informasjonsbolk';
import { Errormelding, Laster } from '../felles/minikomponenter';
import StatsborgerskapInfo from './statsborgerskapinfo';
import TilrettelagtKommunikasjon from './tilrettelagtKommunikasjon';
import { EnkeltInformasjon } from '../felles/enkeltInfo';
import { hentMalform } from '../../utils/konstanter';

const LandOgSprak = () => {
    const { fnr } = useAppStore();

    const person = usePersonalia(fnr);
    const { data: tolkData, error: tolkError, isLoading: tolkLoading } = useTolk(fnr);

    const statsborgerskap: string[] = person.data?.statsborgerskap ?? [];
    const tilrettelagtKommunikasjon: OrNothing<TilrettelagtKommunikasjonData> = tolkData;
    const maalform: OrNothing<string> = person.data?.malform;

    if (tolkLoading) {
        return (
            <Panel border className="info_panel">
                <Laster />
            </Panel>
        );
    }

    if (tolkError?.status === 204 || tolkError?.status === 404) {
        // Pass fordi 204 og 404 thrower error, vil ikke vise feilmelding, men lar komponentene håndtere hvis det ikke er noe data
    } else if (tolkError) {
        return (
            <Panel border className="info_panel">
                <Heading spacing level="2" size="medium" className="panel_header">
                    Personalia
                </Heading>
                <Errormelding />
            </Panel>
        );
    }

    return (
        <Informasjonsbolk header="Land og språk" headerTypo="ingress">
            <StatsborgerskapInfo statsborgerskapData={statsborgerskap} />
            <TilrettelagtKommunikasjon tilrettelagtKommunikasjon={tilrettelagtKommunikasjon} />
            <EnkeltInformasjon header="Målform" value={hentMalform(maalform)} />
        </Informasjonsbolk>
    );
};
export default LandOgSprak;
