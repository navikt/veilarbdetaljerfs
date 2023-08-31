import { createRoot } from 'react-dom/client';
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

    constructor() {
        super();
        this.#root = document.createElement('div');
        this.#root.id = WEB_COMPONENT_APPNAVN;
    }

    static get observedAttributes() {
        return [Veilarbdetaljer.FNR_PROP];
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: 'closed' });
        shadowRoot.appendChild;

        this.loadStyles(shadowRoot)
            .then(() => {
                const fnr = this.getAttribute(Veilarbdetaljer.FNR_PROP) ?? undefined;
                this.renderApp(fnr);
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

    renderApp(fnr?: string) {
        const root = createRoot(this.#root);
        root.render(<App fnr={fnr} />);
    }

    displayError(error: string | Error) {
        this.#root.innerHTML = `<p>${error}</p>`;
    }
}

function joinPaths(...paths: (string | null | undefined)[]) {
    return paths.filter((path) => !!path && path !== '/').join('/');
}
