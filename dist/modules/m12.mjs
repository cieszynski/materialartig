
(new CSSStyleSheet())
    .replace(`
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body, html {   
        /* webkit hack */
        height: 100%;
    }
`)
    .then((sheet) => {
        document.adoptedStyleSheets[
            document.adoptedStyleSheets.length
        ] = sheet;
    });

class AppClass extends HTMLElement {

    static #app = null;

    static App = (obj, ...args) => (!this.#app)
        ? (
            this.#app = document.body
                .appendChild(
                    new AppClass(obj, ...args)
                )
        )
        : this.#app;

    constructor(obj, ...args) {
        super();

        this.role = 'application';

        this.attachShadow({ mode: "open" });

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        fetch(import.meta.resolve('/css/app.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));

        this.shadowRoot.innerHTML = `
                <slot/>`;
        if (this.navigation) {
            this.appendChild(this.navigation);
        }

        if (this.layout) {
            this.appendChild(this.layout)
        }


    }
}

customElements.define('m-app', AppClass);

export const App = (obj, ...args) => AppClass.App(obj, ...args);


class ListDetailClass extends HTMLElement {
    constructor(obj, ...args) {
        super();

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <span>layout1</span>
            <slot/>`

        fetch(import.meta.resolve('/css/layout/listdetail.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));
    }
}

customElements.define('m-listdetail', ListDetailClass);

export const ListDetail = (obj, ...args) => new ListDetailClass(obj, ...args);

class IconClass extends HTMLElement {

    constructor(obj, ...args) {
        super();

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        this.setAttribute('part', 'icon-active');
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 24px;
                    height: 24px;
                    display: block;
                    mask-size: 24px;
                    mask-image: url(${this.path});
                    background-color: var(--on-secondary-container);
                }
            </style>`;
    }
}
customElements.define('m-icon', IconClass);

export const Icon = (obj, ...args) => new IconClass(obj, ...args);