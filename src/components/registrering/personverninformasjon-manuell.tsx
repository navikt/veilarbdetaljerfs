import { BodyLong, Heading, Link, List } from '@navikt/ds-react';

function PersonverninformasjonManuell() {
    return (
        <>
            <Heading level="1" size="large" spacing>
                Registrer deg som arbeidssøker
            </Heading>
            <List title="Rettigheter" size="small">
                <List.Item>
                    Du har rett til å registrere deg som arbeidssøker hos NAV hvis du oppfyller forutsetningene gitt i
                    arbeidsmarkedslovens § 10 se{' '}
                    <Link href="https://lovdata.no/dokument/NL/lov/2004-12-10-76/KAPITTEL_4#%C2%A710" target="_blank">
                        https://lovdata.no/dokument/NL/lov/2004-12-10-76/KAPITTEL_4#%C2%A710
                    </Link>
                    .
                </List.Item>
                <List.Item>
                    Du har krav på at NAV vurderer behovet ditt for veiledning med mål om å komme tilbake i arbeid. Du
                    kan lese mer om dette i NAV-loven § 14 a på{' '}
                    <Link href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a" target="_blank">
                        https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a
                    </Link>
                    .
                </List.Item>
                <List.Item>
                    Du kan søke om dagpenger eller andre ytelser når du har registrert deg som arbeidssøker.
                </List.Item>
            </List>

            <List title="Hva skjer etter at du har registrert deg?" size="small">
                <List.Item>
                    Etter at du har registrert deg vil opplysningene du har gitt om utdanning, livssituasjon og
                    tidligere arbeidsforhold bli brukt til å vurdere hvilken hjelp du skal få fra NAV. Vi vurderer de
                    opplysningene du har gitt oss opp mot de opplysningene vi har om andre arbeidssøkere i omtrent samme
                    situasjon som deg. På bakgrunn av dette vil en veileder fatte et vedtak som sendes til deg. Vedtaket
                    forteller hvordan NAV vurderer din situasjon i arbeidsmarkedet.
                </List.Item>
                <List.Item>
                    Dersom du er uenig i NAV sin vurdering, har du mulighet til å gi tilbakemelding om dette.
                </List.Item>
                <List.Item>
                    Avhengig av hvilken hjelp og ytelser du har krav på kan du få ulike plikter som NAV forventer at du
                    følger opp.
                </List.Item>
                <List.Item>
                    I den perioden du ønsker å være registrert som arbeidssøker hos NAV er det viktig at du leverer
                    meldekort.
                </List.Item>
                <List.Item>
                    Hvis det skjer endringer i livet ditt som påvirker din status som arbeidssøker må du ta kontakt med
                    NAV. Da gjør vi en ny vurdering av ditt behov.
                </List.Item>
            </List>

            <Heading level="2" size="xsmall" spacing>
                Hvilke opplysninger henter vi inn og hva brukes de til?
            </Heading>
            <BodyLong size="small">
                Når du registrerer deg som arbeidssøker vurderer NAV opplysningene dine og foreslår oppfølging for deg.
                For å vurdere hva slags tjenester du trenger må vi ha opplysninger om:
            </BodyLong>
            <List size="small">
                <List.Item>alderen din</List.Item>
                <List.Item>du har vært i jobb</List.Item>
                <List.Item>utdanningen din</List.Item>
                <List.Item>eventuelle utfordringer</List.Item>
            </List>
            <BodyLong size="small" spacing>
                Vi vurderer de opplysningene du har gitt oss opp mot de opplysningene vi har om andre arbeidssøkere i
                omtrent samme situasjon som deg. På bakgrunn av dette blir det laget et automatisk forslag til hvilke
                tjenester vi tror kan passe deg. En veileder vurderer forslaget og sender deg et vedtak.
            </BodyLong>
            <BodyLong size="small" spacing>
                Hvis det skjer endringer som gjør at opplysningene du har gitt oss ikke er riktige lenger, kan du ta
                kontakt med oss. Da gjør vi en ny vurdering av ditt behov for tjenester. Dersom du er uenig i det
                oppfølgingsbehovet vi foreslår, har du mulighet til å gi tilbakemelding om dette inne på innloggede
                sider.
            </BodyLong>

            <Heading level="2" size="xsmall" spacing>
                Hvorfor vurderer NAV mitt bistandsbehov?
            </Heading>
            <BodyLong size="small" spacing>
                Alle personer med lovlig opphold i Norge har rett til å bli registrert som arbeidssøkere. Dette går frem
                av arbeidsmarkedsloven § 10, se{' '}
                <Link
                    href="https://lovdata.no/dokument/NL/lov/2004-12-10-76/KAPITTEL_4#%C2%A710"
                    target="_blank"
                    inlineText
                >
                    https://lovdata.no/dokument/NL/lov/2004-12-10-76/KAPITTEL_4#%C2%A710
                </Link>
                . Når du henvender deg til NAV som arbeidssøker har du også en rett til å få vurdert ditt bistandsbehov
                for å komme i arbeid. Dette går frem av NAV-loven § 14 a som du finner her:{' '}
                <Link
                    href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a"
                    target="_blank"
                    inlineText
                >
                    https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a
                </Link>
                . NAV er også etter NAV-loven § 4 (som du finner på{' '}
                <Link
                    href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_2#%C2%A74"
                    target="_blank"
                    inlineText
                >
                    https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_2#%C2%A74
                </Link>
                ) forpliktet til å bistå deg som arbeidssøker med å komme i jobb.
            </BodyLong>

            <Heading level="2" size="xsmall" spacing>
                Behandling av mine personopplysninger
            </Heading>
            <BodyLong size="small" spacing>
                Når du registrerer deg som arbeidssøker ber vi om opplysninger fra deg for å kunne tilby oppfølging
                tilpasset din situasjon og dine behov. Opplysningene bruker vi til en behovsvurdering som vi etter
                NAV-loven § 14 a (
                <Link
                    href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a"
                    target="_blank"
                    inlineText
                >
                    https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a
                </Link>
                ) er pålagt å utføre. Formålet er å gi NAVs veiledere støtte til å treffe vedtak om riktig bistandsbehov
                slik at vi kan tilby oppfølging og informasjon tilpasset din situasjon.
            </BodyLong>

            <BodyLong size="small">
                Les mer om hvordan NAV behandler personopplysninger her:{' '}
                <Link
                    href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten"
                    target="_blank"
                >
                    https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten
                </Link>
                .
            </BodyLong>
        </>
    );
}

export default PersonverninformasjonManuell;
