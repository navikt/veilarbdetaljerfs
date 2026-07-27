import { createRoot } from 'react-dom/client';
import { WEB_COMPONENT_APPNAVN } from './utils/miljo-utils';
import App from './App';

interface ViteAssetManifest {
    'index.html': {
        css: string[];
    };
}

export class Veilarbdetaljer extends HTMLElement {
    public static readonly FNR_PROP = 'data-fnr';
    public static readonly THEME_PROP = 'theme';
    readonly #root: HTMLDivElement;

    constructor() {
        super();
        this.#root = document.createElement('div');
        this.#root.id = WEB_COMPONENT_APPNAVN;
        this.#root.style.height = '100%';
    }

    static get observedAttributes() {
        return [Veilarbdetaljer.FNR_PROP, Veilarbdetaljer.THEME_PROP];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(this.#root);

        this.loadStyles(shadowRoot)
            .then(() => {
                const fnr = this.getAttribute(Veilarbdetaljer.FNR_PROP) ?? undefined;
                const theme = this.getAttribute(Veilarbdetaljer.THEME_PROP) ?? undefined;
                this.renderApp(fnr, theme);
            })
            .catch((error) => {
                this.displayError(error.message ?? error);
            });
    }

    async loadStyles(shadowRoot: ShadowRoot) {
        const response = await fetch(joinPaths(import.meta.env.BASE_URL, 'asset-manifest.json'));
        if (!response.ok) {
            throw Error(`Failed to get resource "${response.url}"`);
        }

        const manifest: ViteAssetManifest = await response.json();
        for (const css of manifest['index.html'].css) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = joinPaths(import.meta.env.BASE_URL, css);

            shadowRoot.appendChild(link);
        }
    }

    renderApp(fnr?: string, theme?: string) {
        const root = createRoot(this.#root);
        root.render(<App fnr={fnr} theme={theme === 'dark' ? 'dark' : 'light'} />);
    }

    displayError(error: string | Error) {
        this.#root.innerHTML = `<p>${error}</p>`;
    }
}

function joinPaths(...paths: (string | null | undefined)[]) {
    return paths.filter((path) => !!path && path !== '/').join('/');
}
