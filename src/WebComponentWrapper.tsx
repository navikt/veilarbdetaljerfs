import { createRoot, Root } from 'react-dom/client';
import { WEB_COMPONENT_APPNAVN } from './utils/miljo-utils';
import App from './App';

interface ViteAssetManifest {
    'index.html': {
        css: string[];
    };
}

type AppTheme = 'light' | 'dark';

export class Veilarbdetaljer extends HTMLElement {
    public static readonly FNR_PROP = 'data-fnr';
    public static readonly THEME_PROP = 'theme';

    readonly #container: HTMLDivElement;
    #reactRoot?: Root;
    #isReady = false;

    constructor() {
        super();

        this.#container = document.createElement('div');
        this.#container.id = WEB_COMPONENT_APPNAVN;
        this.#container.style.height = '100%';
    }

    static get observedAttributes() {
        return [Veilarbdetaljer.FNR_PROP, Veilarbdetaljer.THEME_PROP];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild(this.#container);

        this.loadStyles(shadowRoot)
            .then(() => {
                this.#reactRoot = createRoot(this.#container);
                this.#isReady = true;
                this.renderApp();
            })
            .catch((error) => {
                this.displayError(error instanceof Error ? error.message : String(error));
            });
    }

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue === newValue || !this.#isReady) {
            return;
        }

        if (name === Veilarbdetaljer.FNR_PROP || name === Veilarbdetaljer.THEME_PROP) {
            this.renderApp();
        }
    }

    disconnectedCallback() {
        this.#reactRoot?.unmount();
        this.#reactRoot = undefined;
        this.#isReady = false;
    }

    private async loadStyles(shadowRoot: ShadowRoot) {
        const response = await fetch(joinPaths(import.meta.env.BASE_URL, 'asset-manifest.json'));

        if (!response.ok) {
            throw new Error(`Failed to get resource "${response.url}"`);
        }

        const manifest: ViteAssetManifest = await response.json();

        for (const css of manifest['index.html'].css) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = joinPaths(import.meta.env.BASE_URL, css);
            shadowRoot.appendChild(link);
        }
    }

    renderApp() {
        if (!this.#reactRoot) {
            return;
        }

        const fnr = this.getAttribute(Veilarbdetaljer.FNR_PROP) ?? undefined;

        const theme = this.normalizeTheme(this.getAttribute(Veilarbdetaljer.THEME_PROP));

        this.#reactRoot.render(<App fnr={fnr} theme={theme} />);
    }

    normalizeTheme(value: string | null): AppTheme {
        return value === 'dark' ? 'dark' : 'light';
    }

    displayError(error: string) {
        this.#container.textContent = error;
    }
}

function joinPaths(...paths: Array<string | null | undefined>) {
    return paths.filter((path): path is string => Boolean(path) && path !== '/').join('/');
}
