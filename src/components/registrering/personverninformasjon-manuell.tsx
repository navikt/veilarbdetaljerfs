import { BodyShort, Heading, Link } from '@navikt/ds-react';
import './registrering.css';

function PersonverninformasjonManuell() {
    return (
        <div className="personvern_modal_innhold">
            <Heading level="1" size="large">
                Når du har registrert deg
            </Heading>
            <ul>
                <li>får du hjelp til å komme i jobb</li>
                <li>kan du søke om dagpenger eller annen økonomisk støtte</li>
                <li>vil arbeidsgivere finne deg i CV-basen vår</li>
                <li>kan du få varsler om ledige stillinger</li>
                <li>kan du bruke din egen aktivitetsplan</li>
            </ul>
            <Heading level="2" size="medium">
                Rettigheter
            </Heading>
            <ul>
                <li>
                    Du har krav på at NAV vurderer behovet ditt for veiledning. Dette er en rettighet du har etter
                    NAV-loven § 14a se{' '}
                    <Link href="https://lovdata.no/NL/lov/2006-06-16-20/%C2%A714a">
                        https://lovdata.no/NL/lov/2006-06-16-20/%C2%A714a
                    </Link>
                    .
                </li>
                <li>Du får et brev der du kan lese mer om tjenestene vi foreslår for deg.</li>
            </ul>
            <Heading level="2" size="medium">
                Plikter
            </Heading>
            <ul>
                <li>Du må sende meldekort hver 14. dag. Det er et krav for å få oppfølging og økonomisk støtte.</li>
                <li>Du må være aktiv arbeidssøker, søke på ledige stillinger og holde CV-en oppdatert.</li>
            </ul>
            <Heading level="2" size="medium">
                Dine opplysninger
            </Heading>
            <BodyShort size="small">
                NAV vurderer hva slags veiledning du trenger når du registrerer deg som jobbsøker. For å gjøre denne
                vurderingen må vi ha opplysninger om
            </BodyShort>
            <ul>
                <li>alderen din</li>
                <li>du har vært i jobb</li>
                <li>utdanningen din</li>
                <li>eventuelle utfordringer</li>
            </ul>
            <BodyShort size="small" spacing>
                Vi har også opplysninger om arbeidssøkere i omtrent samme situasjon som deg. Det gjør at vi kan anta noe
                om mulighetene dine til å finne en jobb. På bakgrunn av dette blir det laget et automatisk forslag til
                hvilke tjenester vi tror kan passe for deg. En veileder vurderer forslaget og sender deg et vedtak i
                posten.
            </BodyShort>
            <Heading level="2" size="xsmall">
                Har du allerede registrert en CV eller jobbønsker på arbeidsplassen.nav.no?
            </Heading>
            <BodyShort size="small" spacing>
                Når du fullfører registreringen som arbeidssøker gjelder ikke samtykket du ga for å opprette CV og
                jobbønsker. CV-en og jobbønskene blir tilgjengelig for veilederen som skal vurdere dine behov. Du må
                derfor endre opplysninger du ikke ønsker å dele på{' '}
                <Link href="https://arbeidsplassen.nav.no/ ">https://arbeidsplassen.nav.no/</Link> før du starter
                registreringen.
            </BodyShort>
            <Heading level="2" size="xsmall">
                Behandling av personopplysninger
            </Heading>
            <BodyShort size="small" spacing={true}>
                Opplysningene dine blir lagret etter arkivloven. NAV bruker anonymiserte personopplysninger om
                arbeidssøkere til å lage offentlig statistikk om arbeidsmarkedet. Les mer om hvordan NAV behandler
                personopplysninger på <Link href="https://www.nav.no/personvern">https://www.nav.no/personvern</Link>.
            </BodyShort>
            <BodyShort size="small">
                <strong>Tips! </strong>Du må fullføre registreringen før du kan søke om dagpenger.
            </BodyShort>
        </div>
    );
}

export default PersonverninformasjonManuell;
