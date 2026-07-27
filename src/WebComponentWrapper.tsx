import { createRoot, type Root } from 'react-dom/client';
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
    public static readonly APP_THEME_PROP = 'app-theme';
    public static readonly LEGACY_APP_THEME_PROP = 'apptheme';

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
        return [
            Veilarbdetaljer.FNR_PROP,
            Veilarbdetaljer.THEME_PROP,
            Veilarbdetaljer.APP_THEME_PROP,
            Veilarbdetaljer.LEGACY_APP_THEME_PROP
        ];
    }

    connectedCallback() {
        const render = () => {
            if (!this.#reactRoot) {
                this.#reactRoot = createRoot(this.#root);
            }
            this.renderApp();
        };

        if (this.#stylesLoaded) {
            render();
            return;
        }

        void this.loadStyles()
            .then(() => {
                this.#stylesLoaded = true;
                render();
            })
            .catch((error) => {
                this.#root.textContent = error instanceof Error ? error.message : String(error);
            });
    }

    disconnectedCallback() {
        this.#reactRoot?.unmount();
        this.#reactRoot = null;
    }

    attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null) {
        if (oldValue !== newValue && this.#reactRoot) {
            this.renderApp();
        }
    }

    private renderApp() {
        const fnr = this.getAttribute(Veilarbdetaljer.FNR_PROP) ?? undefined;

        const themeAttr =
            this.getAttribute(Veilarbdetaljer.THEME_PROP) ??
            this.getAttribute(Veilarbdetaljer.APP_THEME_PROP) ??
            this.getAttribute(Veilarbdetaljer.LEGACY_APP_THEME_PROP);
        const theme = themeAttr === 'dark' ? 'dark' : 'light';

        this.#reactRoot?.render(<App fnr={fnr} theme={theme} />);
    }

    private async loadStyles() {
        const response = await fetch(joinPaths(import.meta.env.BASE_URL, 'asset-manifest.json'));

        if (!response.ok) {
            throw new Error(`Failed to get resource "${response.url}"`);
        }

        const manifest: ViteAssetManifest = await response.json();

        for (const css of manifest['index.html'].css) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = joinPaths(import.meta.env.BASE_URL, css);

            this.#shadowRoot.appendChild(link);
        }
    }
}

function joinPaths(...paths: Array<string | null | undefined>) {
    return paths.filter((path): path is string => Boolean(path) && path !== '/').join('/');
}
