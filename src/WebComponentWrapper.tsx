import { createRoot, type Root } from 'react-dom/client';
import { WEB_COMPONENT_APPNAVN } from './utils/miljo-utils';
import App from './App';

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
        this.#reactRoot?.unmount();
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
        this.#reactRoot?.render(<App fnr={fnr} />);
    }

    displayError(error: string | Error) {
        this.#root.innerHTML = `<p>${error}</p>`;
    }
}

function joinPaths(...paths: (string | null | undefined)[]) {
    return paths.filter((path) => !!path && path !== '/').join('/');
}
