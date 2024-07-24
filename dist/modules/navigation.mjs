class NavigationRailClass extends HTMLElement {

    //align = 'center';
    menu = false;
    fab = null;

    constructor(obj, ...args) {
        super();

        this.role = 'tablist';

        this.attachShadow({ mode: 'open'/* , delegatesFocus: true  */ });

        const onfocus = (event) => {
            const element = this.shadowRoot.querySelector(':focus');

            if (element) {
                switch (event.key) {
                    case "ArrowUp":
                    case "ArrowLeft":
                        let prev = element.previousElementSibling;

                        while (prev) {
                            if (prev.disabled) {
                                prev = prev.previousElementSibling;
                                continue;
                            }

                            prev.focus();
                            break;
                        }
                        break;
                    case "ArrowDown":
                    case "ArrowRight":
                        let next = element.nextElementSibling;

                        while (next) {
                            if (next.disabled) {
                                next = next.nextElementSibling;
                                continue;
                            }

                            next.focus();
                            break;
                        }
                        break;
                }
            }
        }

        this.addEventListener('focus', event => {
            this.addEventListener('keyup', onfocus);
        });

        this.addEventListener('blur', event => {
            this.removeEventListener('keyup', onfocus);
        });

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        fetch(import.meta.resolve('/css/navigation/navigationrail.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));
    }

    set align(str) { this.style.justifyContent = str; }
    get align() { return this.style.justifyContent; }

    set buttons(arr) { this.shadowRoot.append(...arr); }
    get buttons() { return this.shadowRoot.children; }
}

customElements.define('m-navigation-rail', NavigationRailClass);

export const NavigationRail = (obj, ...args) => new NavigationRailClass(obj, ...args);


class NavigationButtonClass extends HTMLElement {

    constructor(obj, ...args) {
        super();

        this.role = 'tab';
        this.tabIndex = -1; // important for left/right-arrow-navigation

        this.attachShadow({ mode: "open" });
        const onkeyup = (event) => {
            if (event.code === 'Enter' || event.code === 'Space') {
                this.click();
            }
        }

        this.addEventListener('click', e => {
            e.preventDefault();

            Array.from(this.parentNode.children).forEach(element => {
                element.selected = (this === element);
            });
        });

        this.addEventListener('focus', () => {
            this.addEventListener('keyup', onkeyup);
        });

        this.addEventListener('blur', () => {
            this.removeEventListener('keyup', onkeyup);
        });

        Object.assign(this, obj);
        Object.freeze(this);
    }

    connectedCallback() {
        fetch(import.meta.resolve('/css/navigation/navigationbutton.css'))
            .then(response => response.text())
            .then(text => (new CSSStyleSheet()).replace(text))
            .then(style => this.shadowRoot.adoptedStyleSheets.push(style));
    }

    set badge(node) { this.shadowRoot.appendChild(node); }
    get badge() { return this.shadowRoot.firstElementChild; }

    set label(str) { this.shadowRoot.textContent = str; }
    get label() { return this.shadowRoot.textContent; }

    set disabled(bool) { this.inert = this.ariaDisabled = bool; }
    get disabled() { return this.ariaDisabled; }

    set selected(bool) {
        this.ariaSelected = bool;
        if (bool) { this.setAttribute('tabindex', 0); }
        else { this.setAttribute('tabindex', -1); }
    }
    get selected() { return this.ariaSelected; }

    set icon(arr) {
        this.style.setProperty('--mask-image-url', `url('${arr[0]}')`);
        this.style.setProperty('--mask-image-url-active', `url('${arr[1] ?? arr[0]}')`);
    }
}

customElements.define('m-navigation-button', NavigationButtonClass);

export const NavigationButton = (obj, ...args) => new NavigationButtonClass(obj, ...args);