class SmallBadgeClass extends HTMLElement {
    constructor(obj, ...args) {
        super();

        this.role = 'status';

        this.attachShadow({ mode: "open" });

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        fetch(import.meta.resolve('/css/badge/smallbadge.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));
    }

    set label(str) { this.ariaLabel = str; }
    get label() { return this.ariaLabel; }
}

customElements.define('m-small-badge', SmallBadgeClass);

export const SmallBadge = (obj, ...args) => new SmallBadgeClass(obj, ...args);


class LargeBadgeClass extends HTMLElement {
    constructor(obj, ...args) {
        super();

        this.role = 'status';
        this.classList = ['typescale-label-small'];

        this.attachShadow({ mode: "open" });

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        fetch(import.meta.resolve('/css/badge/largebadge.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));
    }

    set value(num) { this.shadowRoot.textContent = num; }
    get value() { return this.shadowRoot.textContent; }

    set label(str) { this.ariaLabel = str; }
    get label() { return this.ariaLabel; }

    set visible(bool) { this.hidden = !bool; }
    get visible() { return this.hidden; }
}

customElements.define('m-large-badge', LargeBadgeClass);

export const LargeBadge = (obj, ...args) => new LargeBadgeClass(obj, ...args);