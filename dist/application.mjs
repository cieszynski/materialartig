/* application.mjs */
import {
    CSS,
    Widget
} from '/common.mjs'
import {
    NavButton
} from '/navigation.mjs'

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
body.notcompact:not(.bar) {
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

body.notcompact:not(.bar)
 nav div {
    flex-direction: column;
    height: 100%;
}

body.expanded:not(.bar)
 nav div {
    gap: 0;
 }
`
export class App extends Widget {

    static NAV_TYPE = {
        BAR: 'bar',         // Navigationbar only
        RAIL: 'rail',       // Navigationrail only
        DRAWER: 'drawer',   // Drawer only
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
        console.assert(arr.every((item) => item instanceof NavButton))
        this.node
            .querySelector('nav>div')
            .replaceChildren(
                ...arr.map(elem => elem.node)
            );
    }
}