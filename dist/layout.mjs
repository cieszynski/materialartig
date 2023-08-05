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
    width: 100%;
    flex: 1 0 100%;
    font-size: 20rem;
    pointer-events: all;
    background-color: orange;
}

section.layout>div {
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column; /* WICHTIG */
}

section.layout>header {
    align-items: center;
    display: none;
    gap: 16rem;
    height: 0;
}

body.compact section.layout>header {
    display: flex;
    height: 64rem;
}

section.layout>header>h2 {
    font: var(--typescale-title-large);
    display: inline-flex;
    align-items: center;
    width: 100%;
}

section.layout>header>h2::before {
    position: relative;
    width: 24rem;
    height: 24rem;
    margin: 16rem;
    font-family: Icons-Outlined;
    content: "\\e5d2";
    font-weight: 500;
    font-size: 24rem;
}

/* second level content */
section.layout section.layout:target>header>h2::before {
    content: "\\e5c4"; /* arrow back */
}
`

class Layout extends Widget {

    constructor(properties, data) {
        super(properties, data);

        this.node.addEventListener('click', (e) => {

            /* navigation icon */
            if ((e.clientX > 16 && e.clientX < 40) && (e.clientY > 20 && e.clientY < 44)) {
                if (e.target.offsetParent.classList.contains('listdetail')) {
                    history.back();
                }
            }
        })
    }
}

CSS`

`
export class ListLayout extends Layout {

    constructor(properties) {
        super(properties, {
            nodeName: 'section',
            className: 'layout list',
            innerHTML: `
                <header>
                    <h2>headline</h2>
                    <span>test</span>
                </header>
                <ul class="layout"></ul>`
        });
    }

    set title(str) { this.node.querySelector('h2').textContent = str; }

    set items(arr) {
        this.node.querySelector('ul.layout').replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }

    set divider(str) {
        console.assert(['inset', 'fullwidth', '', false].includes(str));
        this.node.querySelector('ul.layout').classList.toggle('divider-inset', (str === 'inset'))
        this.node.querySelector('ul.layout').classList.toggle('divider-fullwidth', (str === 'fullwidth'))
    }
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

section.listdetail>header {
    width: 100%;
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 1;
    grid-column-end: 3;
}

section.listdetail>nav {
    position: relative;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    overflow-y: auto;
}

section.listdetail>div {
    z-index: 1;
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
}


body.compact section.listdetail nav {
    grid-column-end: 3;
}

body.compact section.listdetail>div {
    width: 100%;
    grid-row-start: 1;
    grid-column-start: 1;
    pointer-events: none;
}
`
export class ListDetailLayout extends Layout {

    constructor(properties) {
        super(properties, {
            nodeName: 'section',
            className: 'layout listdetail',
            innerHTML: `
                <header>
                    <h2>headline</h2>
                    <span>test</span>
                </header>
                <nav aria-label="NAMETOGIVE">
                    <ul class="listdetail"></ul>
                </nav>
                <div class="listdetail"></div>`
        });

        this.node.children[1].onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set title(str) { this.node.querySelector('h2').textContent = str; }

    set items(arr) {
        this.node.querySelector('ul.listdetail').replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }

    set details(arr) {
        this.node.querySelector('div.listdetail').replaceChildren(
            ...arr.map(elem => elem.node)
        );
    }

    set divider(str) {
        console.assert(['inset', 'fullwidth', '', false].includes(str));
        this.node.querySelector('ul.listdetail').classList.toggle('divider-inset', (str === 'inset'))
        this.node.querySelector('ul.listdetail').classList.toggle('divider-fullwidth', (str === 'fullwidth'))
    }

    onclick(e) { console.debug(e) }
}

CSS`
li.item {
    background-color: rgba(var(--color-surface), 1);
    background-repeat: no-repeat;
    background-position-y: bottom;
    background-size: 100% 1rem;
}

/* DIVIDER, a Layout property */
ul.divider-inset li.item:not(:last-child) {
    background-image: linear-gradient(
        to right, 
        transparent 0 16rem, 
        rgba(var(--color-outline-variant), 1) 16rem  calc(100% - 24rem), 
        transparent calc(100% - 24rem)
    );
}

ul.divider-fullwidth li.item:not(:last-child) {
    background-image: linear-gradient(
        to right, 
        rgba(var(--color-outline-variant), 1) 0 100%
    );
}
`
class Item extends Widget {

    constructor(properties, data) {
        super(properties, data);

        /*         this.node.firstElementChild.onclick = (e) => {
                    this.onclick.call(this, e);
                } */
    }

    onclick(e) { console.debug(e) }
}


CSS`
li.listitem {    
    --color-headline: rgba(var(--color-on-surface), 1);
    --color-subtext: var(--color-on-surface-variant);
    --color-leading: var(--color-on-surface-variant);
    --color-trailing: var(--color-on-surface-variant);
}

li.listitem a {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr auto;
     background-color: rgba(var(--color-surface), 1);
     /*   background-repeat: no-repeat;
    background-position-y: bottom; */
    padding: 8rem 24rem 8rem 16rem;
    position: relative;
}

li.listitem h2 {
    color: var(--color-headline);
    font: var(--typescale-body-large);
    letter-spacing: var(--typescale-body-large-tracking);    
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column-start: 2;
    grid-column-end: 3;
    height: 100%;
    display: flex;
    align-items: center;
    pointer-events: none;
}

li.listitem p.subtext {
    font: var(--typescale-body-medium);
    letter-spacing: var(--typescale-body-medium-tracking);   
    grid-row-start: 2;
    grid-row-end: 3;
    grid-column-start: 2;
    grid-column-end: 3;
    pointer-events: none;
}

li.listitem p.subtext span {
    display: block;
}

li.listitem div.leading {    
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8rem;
    pointer-events: none;
    color: var(--color-subtext);
}

li.listitem div.trailing {
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-start: 3;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 8rem;
    pointer-events: none;
    color: var(--color-subtext);
}

/* HOVERED */
li.listitem[tabindex]:hover {
    background-image: linear-gradient(rgba(var(--color-on-surface), .08) 0 100%);
}

/* FOCUS / PRESSED */
li.listitem[tabindex]:active,
li.listitem[tabindex]:focus {
    background-image: linear-gradient(rgba(var(--color-on-surface), .12) 0 100%);
}

/* DISABLED */
li.listitem:not([tabindex]) {
    --color-headline: rgba(var(--color-on-surface), .38);
    --color-subtext: rgba(var(--color-on-surface), .38);
    --color-leading: rgba(var(--color-on-surface), .38);
    --color-trailing: rgba(var(--color-on-surface), .38);
}

/* DIVIDER, a ListDetailLayout property */
ul.divider-inset li.listitem:not(:last-child)::after {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 1rem;
    content: "";
    background-image: linear-gradient(
        to right, 
        transparent 0 16rem, 
        rgba(var(--color-outline-variant), 1) 16rem  calc(100% - 24rem), 
        transparent calc(100% - 24rem)
    );
}

ul.divider-fullwidth li.listitem:not(:last-child)::before {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: 1rem;
    content: "";
    background-image: linear-gradient(to right, rgba(var(--color-outline-variant), 1) 0 100%);
}
`
export class ListItem extends Widget {

    constructor(properties) {
        super(properties, {
            nodeName: 'li',
            className: 'listitem',
            innerHTML: `<a>
                            <h2 class="headline"></h2>
                        </a>`
        });

        /*  tabindex=0 ensures a correct tab order if
            buttons/checkboxes/switches are inside this element */
        if (!properties.disabled) { this.node.tabIndex = 0; }

        /* ensures keyboard navigation */
        this.node.onkeydown = (e) => {
            if (e.keyCode === 13 && (!this.disabled)) { this.onclick.call(this, e); }
        }

        this.node.onclick = (e) => {
            if (!this.disabled) { this.onclick.call(this, e); }
        }
    }

    set target(href) { this.node.firstElementChild.href = `#${href}`; }

    set disabled(bool) {
        if (bool) { this.node.removeAttribute('tabindex'); }
        else { this.node.tabIndex = 0; }
    }

    get disabled() { return !this.node.hasAttribute('tabindex'); }

    set headline(str) { this.node.querySelector('h2').textContent = str; }

    /* find or create element and set content */
    set subtext(str) {
        const node = (this.node.querySelector('p.subtext')
            ?? this.node.firstElementChild.appendChild(document.createElement('p')));
        node.className = 'subtext';
        node.textContent = str;
    }

    /* find or create element and set content */
    set subtext2(str) {
        const node = (this.node.querySelector('p.subtext')
            ?? this.node.firstElementChild.appendChild(document.createElement('p')));
        node.className = 'subtext';

        const subnode = (node.querySelector('span')
            ?? node.appendChild(document.createElement('span')));
        subnode.textContent = str;
    }

    /* find or create element and set content */
    set leading(elem) {
        const node = (this.node.querySelector('div.leading')
            ?? this.node.firstElementChild.appendChild(document.createElement('div')));
        node.className = 'leading';
        node.replaceChildren(elem.node);
    }

    /* find or create element and set content */
    set trailing(elem) {
        const node = (this.node.querySelector('div.trailing')
            ?? this.node.firstElementChild.appendChild(document.createElement('div')));
        node.className = 'trailing';
        node.replaceChildren(elem.node);
    }

    onclick(e) { console.debug(e) }
}

CSS`
li.item.switch {
}

li.item.switch label {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 8rem 24rem 8rem 16rem;
}

li.item.switch label input.switch {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    grid-row: span 2;
    grid-column-start: 2;
    grid-column-end: 3;

    width: 52rem;
    height: 32rem;
    border-radius: 16rem;
    border-width: 2rem;
    border-style: solid;
    border-color: rgba(var(--color-outline), 1); /* TRACK, Outline color (unselected) */
    background-color: rgba(var(--color-surface-container-highest), 1); /* TRACK, color (unselected) */
    transition: 
        border-color 0s .15s,
        background-color 0s .15s;
}

li.item.switch label input.switch:checked {
    border-color: rgba(var(--color-primary), 1); /* TRACK, Outline color (selected) */
    background-color: rgba(var(--color-primary), 1); /* TRACK, color (selected) */
    transition: 
        border-color 0s .15s,
        background-color 0s .15s;
}

li.item.switch label input.switch::after {
    font-family: Icons;
    font-weight: 900;
    font-size: 16rem;
    content: attr(data-icon-unchecked);
    color: rgba(var(--color-surface-container-highest), 1); /* ICON, Color (unselected) */
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 28rem;
    height: 28rem;
    border-radius: 14rem;
    background-clip: padding-box; /* prevent translucence of background */
    border-color: rgba(var(--color-surface-container-highest), 1); /* THUMB, background to shrink knob (unselected)  */
    border-style: solid;
    border-width: 6rem;
    background-color: rgba(var(--color-outline), 1); /* THUMB, background knob  (unselected) */
    transform-origin: center;
    transform: translate3d(0, 0, 0);
    transition: 
        content 0s .15s,
        color 0s .15s,
        background-color 0s .15s,
        transform .15s .15s,
        border-width .15s .3s,
        width .15s,
        height .15s,
        left .15s,
        top .15s;
}

li.item.switch label input.switch:not(:disabled):active::after {
    border-width: 0;
    transition: border-width .15s;
}

li.item.switch label input.switch:checked::after {
    content: attr(data-icon-checked);
    color: rgba(var(--color-on-primary-container), 1); /* ICON, Color (selected) */
    transition: 
        content 0s .15s,
        color 0s .15s,
        background-color 0s .15s,
        transform .15s .15s,
        border-width .15s,
        width .15s .3s,
        height .15s .3s,
        left .15s .3s,
        top .15s .3s;
    background-color: rgba(var(--color-on-primary), 1); /* THUMB, background knob  (selected) */
    transform: translate3d(20rem, 0, 0);
    border-width: 0; /* THUMB, background to shrink knob (selected)  */
    width: 24rem;
    height: 24rem;
    left: 2rem;
    top: 2rem;
}

li.item.switch label input.switch:checked:not(:disabled):active::after {
    top: 0;
    left: 0;
    width: 28rem;
    height: 28rem;
    transition: 
        width .15s,
        height .15s,
        left .15s,
        top .15s;
}

li.item.switch label span {
    font: var(--typescale-body-large);
    letter-spacing: var(--typescale-body-large-tracking);   
    grid-row: 1 / 2;
    pointer-events: none;
}

li.item.switch label small {
    font: var(--typescale-body-medium);
    letter-spacing: var(--typescale-body-medium-tracking);   
    grid-row: 2 / 3;
    pointer-events: none;
    display: block;
}

li.item.switch label input+small,
li.item.switch label span:last-child {      
    grid-row: 1 / 3;
}

/* DISABLED */
li.item.switch label input.switch:disabled {
    border-color: rgba(var(--color-on-surface), .12); /* TRACK, Outline color (unselected) */
    background-color: rgba(var(--color-surface-container-highest), .12); /* TRACK, color (unselected) */
}

li.item.switch label input.switch:disabled:checked {
    border-color: rgba(var(--color-on-surface), .12); /* TRACK, Outline color (selected) */
    background-color: rgba(var(--color-on-surface), .12); /* TRACK, color (selected) */
}

li.item.switch label input.switch:disabled::after {
    color: rgba(var(--color-surface-container-highest), .38); /* ICON, Color (unselected) */
    background-color: rgba(var(--color-on-surface), .38); /* THUMB, background knob  (unselected) */
    border-color: rgba(var(--color-surface-container-highest), .12);/* THUMB, background to shrink knob (unselected)  */
}

li.item.switch label input.switch:disabled:checked::after {
    color: rgba(var(--color-on-surface), .38); /* ICON, Color (selected) */
    background-color: rgba(var(--color-surface), 1); /* THUMB, background knob  (selected) */
    border-width: 0; /* THUMB, background to shrink knob (selected)  */
}

li.item.switch label input:disabled~small,
li.item.switch label input:disabled~span {
    color: rgba(var(--color-on-surface), .38);
}
`
export class SwitchItem extends Item {

    constructor(properties) {
        super(properties, {
            nodeName: 'li',
            className: 'item switch',
            innerHTML: `
                <label>
                    <input class="switch" type="checkbox"/>
                </label>`
        });

        this.node.addEventListener('change', (e) => {
            this.onclick.call(this, e);
        })
    }

    set label(str) {
        const node = (this.node.querySelector('span')
            ?? this.node.firstElementChild.appendChild(document.createElement('span')));
        node.textContent = str;
    }

    set sublabel(str) {
        const node = (this.node.querySelector('small')
            ?? this.node.firstElementChild.appendChild(document.createElement('small')));
        node.textContent = str;
    }

    // iconChecked: "\ue876",
    // iconUnchecked: "\ue5cd"
    set icon(obj) {
        const node = this.node.querySelector('input.switch')
        node.dataset.iconChecked = obj?.checked ?? "";
        node.dataset.iconUnchecked = obj?.unchecked ?? "";
    }

    set checked(bool) { this.node.querySelector('input.switch').checked = bool; }
    get checked() { return this.node.querySelector('input.switch').checked; }

    set disabled(bool) { this.node.querySelector('input.switch').disabled = bool; }
    get disabled() { return this.node.querySelector('input.switch').disabled; }
}

/* --------------------------------------------- */
CSS``
export class PaneLayout extends Layout {

}

CSS``
export class FeedLayout extends Layout {

}