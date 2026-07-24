import { createRoot, type Root } from 'react-dom/client';
import { WEB_COMPONENT_APPNAVN } from './utils/miljo-utils';
import App, { type AppTheme } from './App';

interface ViteAssetManifest {
    'index.html': {
        css: string[];
    };
}

export class Veilarbdetaljer extends HTMLElement {
    static FNR_PROP = 'data-fnr';
    readonly #root: HTMLDivElement;
    readonly #shadowRoot: ShadowRoot;
    #reactRoot: Root | null = null;
    #themeObserver: MutationObserver | null = null;
    #stylesLoaded = false;

    constructor() {
        super();
        this.#shadowRoot = this.attachShadow({ mode: 'closed' });
        this.#root = document.createElement('div');
        this.#root.id = WEB_COMPONENT_APPNAVN;
        this.#root.style.height = '100%';
        this.#shadowRoot.appendChild(this.#root);
    }

    static get observedAttributes() {
        return [Veilarbdetaljer.FNR_PROP];
    }

    connectedCallback() {
        const mountApp = () => {
            if (this.#reactRoot === null) {
                this.#reactRoot = createRoot(this.#root);
            }
            this.renderApp();
            this.observeThemeChanges();
        };

        if (this.#stylesLoaded) {
            mountApp();
            return;
        }

        this.loadStyles(this.#shadowRoot)
            .then(() => {
                this.#stylesLoaded = true;
                mountApp();
            })
            .catch((error) => {
                this.displayError(error.message ?? error);
            });
    }

    attributeChangedCallback() {
        this.renderApp();
    }

    disconnectedCallback() {
        this.#themeObserver?.disconnect();
        this.#reactRoot?.unmount();
        this.#themeObserver = null;
        this.#reactRoot = null;
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

    renderApp() {
        const fnr = this.getAttribute(Veilarbdetaljer.FNR_PROP) ?? undefined;
        const theme = getThemeFromBody();
        this.#reactRoot?.render(<App fnr={fnr} theme={theme} />);
    }

    observeThemeChanges() {
        if (document.body === null) {
            return;
        }

        this.#themeObserver = new MutationObserver(() => this.renderApp());
        this.#themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class', 'data-theme']
        });
    }

    displayError(error: string | Error) {
        this.#root.innerHTML = `<p>${error}</p>`;
    }
}

function getThemeFromBody(): AppTheme {
    if (document.body === null) {
        return 'light';
    }

    const dataTheme = document.body.getAttribute('data-theme');

    if (dataTheme === 'dark') {
        return 'dark';
    }

    if (dataTheme === 'light') {
        return 'light';
    }

    if (document.body.classList.contains('dark')) {
        return 'dark';
    }

    return 'light';
}

function joinPaths(...paths: (string | null | undefined)[]) {
    return paths.filter((path) => !!path && path !== '/').join('/');
}
