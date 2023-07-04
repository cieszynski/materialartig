/* application.mjs */

export const CSS = (strings, ...values) => {
    (new CSSStyleSheet())
        .replace(String.raw({ raw: strings }, ...values))
        .then((sheet) => {
            document.adoptedStyleSheets[
                document.adoptedStyleSheets.length
            ] = sheet;
        });
}


export class Widget {

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
        super(properties, data);
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


CSS`
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
    list-style: none;
}

*:focus { outline: none; }

html {
    font-size: 6.25%;
}

body, html {
    background-color: rgba(var(--color-surface), 1);
    position: relative;
    overflow: hidden;
    width: 100vw;
    height: 100%;
}

body {
    display: flex;
    flex-direction: column;
}

body.drawer,
body.notcompact {
    flex-direction: row-reverse;
}

main {
    overflow-y: scroll;
    width: 100%;
    height: 100%;
}

nav {
    outline: 1px solid blue;
}

nav div {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden auto;
    gap: 8rem;
}

body.compact
 nav div {
    width: 100%;
}

body.notcompact
 nav div {
    flex-direction: column;
    height: 100%;
}

body.expanded 
 nav div {
    gap: 0;
 }
`
export class App extends Widget {

    static NAV_TYPE = {
        BAR: 'bar',         // Navigationbar only
        RAIL: 'rail',       // Navigationrail only
        DRAWER: 'drawer',   // Drawer only
        FULL: 'full',       // 
        ALL: 'all'
    }

    constructor(properties) {
        super(properties, {
            nodeName: 'body',
            innerHTML: `
            <main>
                <div/>
            </main>
            <nav>
                <div/>
            </nav>` });
        document.body.replaceWith(this.node);

        App.mediaQueries = {
            portrait: window.matchMedia("(orientation: portrait)"),
            landscape: window.matchMedia("(orientation: landscape)"),
            compact: window.matchMedia(`(max-width: ${properties?.breakpoints?.compact ?? 600}px)`),
            notcompact: window.matchMedia(`(min-width: ${properties?.breakpoints?.compact ?? 600}px)`),
            medium: window.matchMedia(`(min-width: ${properties?.breakpoints?.compact ?? 600}px) 
                and (max-width: ${properties?.breakpoints?.expanded ?? 1200}px)`),
            expanded: window.matchMedia(`(min-width: ${properties?.breakpoints?.expanded ?? 1200}px)`),
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion'),
        }

        Object.entries(App.mediaQueries).forEach(([name, matchMedia]) => {
            // set onload:
            this.node.classList.toggle(name, matchMedia.matches);

            // set onchange:
            matchMedia.addEventListener('change', (e) =>
                this.node.classList.toggle(name, e.matches)
            );
        });

    }

    set child(elem) {
        //console.assert
        this.node
            .querySelector('main')
            .replaceChildren(elem.node);
    }

    set navtype(str) {
        console.assert(Object.values(App.NAV_TYPE).includes(str), 'invalid navtype');
        this.node.classList.remove(...Object.values(App.NAV_TYPE));
        this.node.classList.add(str);
    }

    set navitems(arr) {
        //console.assert(arr.every((item) => item instanceof NavButton))
        this.node
            .querySelector('nav>div')
            .replaceChildren(
                ...arr.map(elem => elem.node)
            );
    }
}

/*  */
CSS`
div.column {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    position: relative;
}`

export class Column extends Container {

    constructor(properties) {

        super(properties, {
            nodeName: 'div',
            className: 'column'
        });
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }

    set align(str) {
        console.assert(['start', 'center', 'end'].includes(str), str);
        this.node.style.alignItems = str;
    }
}


CSS`
div.row {
    display: flex;
    flex-direction: row;
    height: fit-content;
}`

export class Row extends Container {

    constructor(properties) {

        super(properties, {
            nodeName: 'div',
            className: 'row'
        });
    }

    set gap(num) { this.node.style.gap = `${num}rem`; }

    set align(str) {
        console.assert(['start', 'center', 'end'].includes(str), str);
        this.node.style.justifyContent = str;
    }
}


CSS`
div.stack {
    position: relative;
    width: 100%;
    height: 100%;
}

div.stack>* {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
`

export class Stack extends Widget {

    constructor(properties) {

        super(properties, {
            nodeName: 'div',
            className: 'stack'
        });
    }

    set children(arr) {
        this.node.replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }
}