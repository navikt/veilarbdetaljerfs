export const WEB_COMPONENT_APPNAVN = 'veilarb-detaljer';

export const NAV_INTERN_PREPROD_SUFFIX = 'intern.dev.nav.no';
export const NAV_INTERN_PROD_SUFFIX = 'intern.nav.no';

export const NAV_INTERN_PREPROD_SUFFIX_GAMMELT = 'dev.intern.nav.no';

const DEV_DOMAINS = ['dev', 'app-q1', 'app-q0', 'localhost'];

export function finnInternNavDomene() {
    return erITestMiljo() ? NAV_INTERN_PREPROD_SUFFIX : NAV_INTERN_PROD_SUFFIX;
}

export function finnInternNavDomeneGammelt() {
    return erITestMiljo() ? NAV_INTERN_PREPROD_SUFFIX_GAMMELT : NAV_INTERN_PROD_SUFFIX;
}

/**
 * Hvorvidt applikasjonen er bygget med `mode = lokal`.
 * `lokal` er en egendefinert [Vite mode](https://vite.dev/guide/env-and-mode#modes) som representerer lokal utvikling.
 * Dersom applikasjonen bygges/kjøres med `vite --mode lokal` vil denne funksjonen returnere true. Dette kan f.eks. brukes
 * for å skru på funksjonalitet som bare skal være tilgjengelig ved lokal utvikling.
 */
export function erLokalMode() {
    return import.meta.env.MODE === 'lokal';
}

/**
 * Hvorvidt applikasjonen er bygget med `mode = demo`.
 * `demo` er en egendefinert [Vite mode](https://vite.dev/guide/env-and-mode#modes) som representerer lokal utvikling.
 * Dersom applikasjonen bygges/kjøres med `vite --mode demo` vil denne funksjonen returnere true. Dette kan f.eks. brukes
 * for å skru på funksjonalitet som bare skal være tilgjengelig i demo-versjonen av applikasjonen.
 */
export function erDemoMode() {
    return import.meta.env.MODE === 'demo';
}

const erITestMiljo = (): boolean => {
    return window.location.hostname.split('.').findIndex((domain) => DEV_DOMAINS.includes(domain)) >= 0;
};
