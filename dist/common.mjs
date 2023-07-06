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

export class Template extends Widget {

    constructor(properties, data) {
        super(properties, data);

        document.head.insertAdjacentElement('beforeend', this.node);
    }
}

export class Component extends Widget {

    constructor(properties, data) {
        super(properties, data)

        //document.body.insertAdjacentElement('beforeend', this.node);
        document.body.insertAdjacentElement('afterbegin', this.node);
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