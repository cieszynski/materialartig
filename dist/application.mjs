/* 
    materialartig
    
    JavaScript library for progressive web applications 
    with a focus on Google's Material Design System v3.
    
    Copyright (C) 2023 - present Stephan Cieszynski

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
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

a { 
    text-decoration: none;
    color: currentColor; 
}

html {
    font-size: 6.25%;
}

body, html {
    background-color: rgba(var(--color-surface), 1);
    overscroll-behavior: none;  /* prevent pull to refresh */
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
    overflow: hidden;
    display: flex;
    background: #ddd;
    /* overflow-y: scroll; */
    width: 100%;
    height: 100%;
}

nav div { /* TODO */
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
            book: window.matchMedia("(horizontal-viewport-segments: 2)"),
            tabletop: window.matchMedia("(vertical-viewport-segments: 2)"),
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
                {
                    this.node.classList.toggle(name, e.matches);
                    /* document    WICHTIG 
                        .querySelector(location.hash)
                        .scrollIntoView();*/
                }
            );
        });

          
       /// window.onload = (e) => {/* window.location.replace('#'); */ history.go(-history.length); window.location.hash = '#'}
    }

    set child(elem) {
        //console.assert
        this.node
            .querySelector('main')
            .replaceChildren(elem.node);
    }

    set children(arr) {
        this.node
            .querySelector('main')
            .replaceChildren(
                ...arr.map((elem, idx) => {
                    console.log(idx)
                    return elem.node;
                })
            );
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