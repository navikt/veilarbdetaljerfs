import { BodyLong, Panel, Heading } from "@navikt/ds-react"
import { DobbeltInformasjon } from "./felles/dobbelinfo"



export const InfoBoks = () => {

    const values = ["Value 1", "Value 2", "Value 3"];

    return (
        <Panel border className="info_panel">
            <Heading spacing level="2" size="large">
                Infoboks
            </Heading>
            <BodyLong>
                <DobbeltInformasjon header="Tekstfelt" values={values} />
            </BodyLong>
        </Panel>
    );
}