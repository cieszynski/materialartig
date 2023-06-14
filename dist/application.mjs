/* application.mjs */

export class Widget {

    static initonce(css = "") {
        (new CSSStyleSheet())
            .replace(css)
            .then((sheet) => {
                document.adoptedStyleSheets[
                    document.adoptedStyleSheets.length
                ] = sheet;
            });
    }

    constructor(properties, data) {

        this.node = Object.assign(
            document.createElement(data.nodeName),
            {
                className: data?.className ?? '',
                innerHTML: data?.innerHTML ?? ''
            }
        );

        Object
            .entries(properties)
            .sort(([, x], [, y]) => {
                return Array.isArray(x)
                    ? -1
                    : Array.isArray(y)
                        ? 1
                        : 0;
            }).forEach(([key, value]) => {
                this[key] = value;
            });
        Object.freeze(this);
    }

    set id(str) { this.node.id = str }
}

export class Element extends Widget {

    constructor(properties, data) {
        super(properties, data)
    }
}

export class Component extends Widget {

    constructor(properties, data) {
        super(properties, data)

        document.body.insertAdjacentElement('beforeend', this.node);
    }

}

export class Container extends Widget {

    constructor(properties, data) {
        super(properties, data)

    }

    set children(arr) {
        this.node.replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }

    set padding(num) { this.node.style.padding = `${num}rem`; }
    set paddingTop(num) { this.node.style.paddingTop = `${num}rem`; }
    set paddingLeft(num) { this.node.style.paddingLeft = `${num}rem`; }
    set paddingRight(num) { this.node.style.paddingRight = `${num}rem`; }
    set paddingBottom(num) { this.node.style.paddingBottom = `${num}rem`; }
}

export class App extends Widget {

    static #css = `
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        user-select: none;
    }

    *:focus { outline: none; }

    html {
        font-size: 6.25%;
    }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties, { nodeName: 'main', innerHTML: '<div/>' })

        document.body.insertAdjacentElement('afterbegin', this.node);
    }

    set child(elem) { this.node.firstElementChild.replaceWith(elem.node); }
}

/*  */
export class Column extends Container {

    static #css = `
    div.column {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto;
        position: relative;
    }`

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, {
            nodeName: 'div',
            className: 'column'
        });
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }
}

export class Row extends Container {

    static #css = `
    div.row {
        display: flex;
        flex-direction: row;
        height: fit-content;
    }`

    static { super.initonce(this.#css) }

    constructor(properties) {

        super(properties, {
            nodeName: 'div',
            className: 'row'
        });
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }
}