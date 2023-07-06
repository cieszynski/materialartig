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
section.listdetail ul {
    font-size: 20rem; /* TODO */
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
                <ul></ul>
                <article></article>
            `});
    }

    set topappbar(elem) {

    }

    set items(arr) {
        this.node.children[1].replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }
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