export const NAV_INTERN_PREPROD_SUFFIX = 'intern.dev.nav.no';
export const NAV_INTERN_PROD_SUFFIX = 'intern.nav.no';

const DEV_DOMAINS = ['dev', 'app-q1', 'app-q0', 'localhost'];

export function finnInternNavDomene() {
    return erITestMiljo() ? NAV_INTERN_PREPROD_SUFFIX : NAV_INTERN_PROD_SUFFIX;
}

export function erMock() {
    return import.meta.env.MODE === 'development';
}

const erITestMiljo = (): boolean => {
    return window.location.hostname.split('.').findIndex((domain) => DEV_DOMAINS.includes(domain)) >= 0;
};
