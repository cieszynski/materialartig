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
    Widget,
    Template,
} from '/common.mjs'


CSS`
section.layout {

}

section.layout h1 {
    font: var(--typescale-title-large);
}
`
export class Layout extends Widget {

}

CSS`
section.listdetail  {
    font-size: 20rem; /* TODO */
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    width: 100%;
    height: 100%;
}

section.listdetail header {
    width: 100%;
    outline: 1px solid green;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}

section.listdetail ul {
    outline: 1px solid red;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
}

section.listdetail article {
    outline: 1px solid blue;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 3;
}

/* section.listdetail article {
    display: none;
}

section.listdetail. article {
    display: block;
}
 */
body.notcompact section.listdetail ul {
    grid-column-end: 2;
}

body.notcompact section.listdetail article {
    grid-column-start: 2;
}
`
export class ListDetailLayout extends Layout {

    constructor(properties) {
        super(properties, {
            nodeName: 'section',
            className: 'layout listdetail',
            innerHTML: `
                <header>
                    <h1>ListDetailLayout</h1>
                </header>
                <ul>
                    <li>list</li>
                    <li>list</li>
                </ul>
                <article>
                article
                </article>`
        });

        this.node.children[1].onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set topappbar(elem) {

    }

    set listItems(arr) {
        this.node.children[1].replaceChildren(
            ...arr.map(elem => document
                .createElement('li')
                .appendChild(elem.node)
                .parentNode
            )
        );
    }

    set detailItem(elem) { this.node.lastElementChild.replaceChildren(elem.node); }

    get detailItem() { return this.node.lastElementChild.firstElementChild; }

    onclick(e) { console.debug(e) }
}


export class ListItemTemplate extends Template {

    constructor(properties) {
        super(properties, {
            nodeName: 'template',
            className: 'listitem',
            innerHTML: `<p>test</p>`
        });
    }
}

CSS``
export class PaneLayout extends Layout {

}

CSS``
export class FeedLayout extends Layout {

}