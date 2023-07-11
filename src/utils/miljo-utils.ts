export const NAV_INTERN_PREPROD_SUFFIX = 'intern.dev.nav.no';
export const NAV_INTERN_PROD_SUFFIX = 'intern.nav.no';

export function finnInternNavDomene() {
    return erMock() ? NAV_INTERN_PREPROD_SUFFIX : NAV_INTERN_PROD_SUFFIX;
}

export function erMock() {
    return import.meta.env.MODE === 'development';
}
