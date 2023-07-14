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
    Element
} from '/common.mjs'


CSS`
button {
    border: none;
    background: none;
    /* ensure to be clickable in every layout */
    pointer-events: all;
}
`
export class Button extends Element {

    constructor(properties, data) {
        super(properties, { nodeName: 'button' });

        this.node.onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set label(str) { this.node.textContent = str; }

    set disabled(bool) { this.node.disabled = !!bool }

    onclick(e) { console.debug(e) }
}


CSS`
label {
    /* ensure to be clickable in every layout */
    pointer-events: all;
}

label input {
    appearance: none;
}`

export class ToggleButton extends Element {

    constructor(properties) {
        super(properties, {
            nodeName: 'label',
            innerHTML: '<input type="checkbox"><span/>'
        });

        this.node.onclick = (e) => {
            this.onclick.call(this, e);
        }
    }

    set label(str) { this.node.lastElementChild.textContent = str; }

    set checked(bool) { this.node.firstElementChild.checked = !!bool }

    get checked() { return this.node.firstElementChild.checked; }

    set disabled(bool) { this.node.firstElementChild.disabled = !!bool }

    onclick(e) { console.debug(e) }
}


CSS`
button.icon {   
    --icon-color-default: var(--color-on-surface-variant);
    --icon-color-disabled: var(--color-on-surface);
    background-color: rgba(var(--container-color-default), 1);
    font-size: 0;     
    width: 40rem;
    height: 40rem;
    border-radius: 20rem;
    border-style: solid;
    border-width: 0;
}

button.icon::after {
    color: rgba(var(--icon-color-default), 1);
    font-family: Icons-Outlined;
    content: attr(data-icon);
    line-height: 1.6;
    font-weight: 500;
    font-size: 24rem;
}

button.icon:not(:disabled,:active):hover {
    background-image: linear-gradient(rgba(var(--icon-color-default), .08) 0 100%);
}

button.icon:not(:disabled):focus,
button.icon:not(:disabled):active {
    background-image: linear-gradient(rgba(var(--icon-color-default), .12) 0 100%);
}

button.icon:disabled {
    background-color: rgba(var(--container-color-disabled), .12);
    border-color: rgba(var(--color-on-surface), .12) !important;
}

button.icon:disabled::after {
    color: rgba(var(--icon-color-disabled), .38);
}`

export class IconButton extends Button {

    constructor(properties) {
        super(properties);

        this.node.className = 'icon';
    }

    set icon(str) { this.node.dataset.icon = str; }
}


CSS`
label.icon {   
    --icon-color-unselected: var(--color-on-surface-variant);
    --icon-color-selected: var(--color-primary);
    --icon-color-disabled: var(--color-on-surface);
    font-size: 0;     
    width: 40rem;
    height: 40rem;
}

label.icon input {
    width: 100%;
    text-align: center;
    border-radius: 20rem;
    border-style: solid;
    border-width: 0;
}

label.icon input {
    background-color: rgba(var(--container-color-unselected), 1);
}

label.icon input:checked {
    background-color: rgba(var(--container-color-selected), 1);
}

label.icon input:disabled {
    background-color: rgba(var(--container-color-disabled), .12);
}

label.icon input::after {
    color: rgba(var(--icon-color-unselected), 1);
    font-family: Icons-Outlined;
    content: attr(data-icon);
    line-height: 1.6;
    font-weight: 500;
    font-size: 24rem;
}

label.icon input:checked::after {
    color: rgba(var(--icon-color-selected), 1);
    font-family: Icons;
}

label.icon input:disabled::after {
    color: rgba(var(--icon-color-disabled), .38);
}

label.icon input:not(:disabled,:active):hover {
    background-image: linear-gradient(rgba(var(--icon-color-unselected), .08) 0 100%);
}

label.icon input:not(:disabled):focus,
label.icon input:not(:disabled):active {
    background-image: linear-gradient(rgba(var(--icon-color-unselected), .12) 0 100%);
}

label.icon input:disabled {
    border-color: rgba(var(--color-on-surface), .12) !important;
}

label.icon input:checked:disabled {
    background-color: rgba(var(--container-color-disabled), .12);
}`

export class IconToggleButton extends ToggleButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon';
    }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }
}


CSS`
button.icon.outlined {
    --icon-color-default: var(--color-on-surface-variant) !important;
    border-color: rgba(var(--color-outline), 1);
    border-width: 1rem;
}`

export class OutlinedIconButton extends IconButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon outlined';
    }
}


CSS`
label.icon.outlined {
    --icon-color-unselected: var(--color-on-surface-variant) !important;
    --icon-color-selected: var(--color-on-inverse-surface) !important;
    --container-color-selected: var(--color-inverse-surface);
    --container-color-disabled: var(--color-on-surface);
}

label.icon.outlined input {
    border-color: rgba(var(--color-outline), 1);
    border-width: 1rem;
}

label.icon.outlined input:checked:not(:disabled) {
    background-color: rgba(var(--container-color-selected), 1);
    border-width: 0;
}`

export class OutlinedIconToggleButton extends IconToggleButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon outlined';
    }
}


CSS`
button.icon.filled-tonal {
    --icon-color-default: var(--color-on-secondary-container) !important;
    --container-color-default: var(--color-secondary-container);
    --container-color-disabled: var(--color-on-surface);
}`

export class FilledTonalIconButton extends IconButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled-tonal';
    }
}


CSS`
label.icon.filled-tonal {
    --icon-color-unselected: var(--color-on-surface-variant);
    --icon-color-selected: var(--color-on-secondary-container);
    --container-color-unselected: var(--color-surface-container-highest);
    --container-color-selected: var(--color-secondary-container);
    --container-color-disabled: var(--color-on-surface);
}`

export class FilledTonalIconToggleButton extends IconToggleButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled-tonal';
    }
}


CSS`
button.icon.filled {
    --icon-color-default: var(--color-on-primary);
    --container-color-default: var(--color-primary);
    --container-color-disabled: var(--color-on-surface);
}`

export class FilledIconButton extends IconButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled';
    }
}


CSS`
label.icon.filled {
    --icon-color-unselected: var(--color-primary);
    --icon-color-selected: var(--color-on-primary);
    --container-color-unselected: var(--color-surface-container-highest);
    --container-color-selected: var(--color-primary);
    --container-color-disabled: var(--color-on-surface);
}`

export class FilledIconToggleButton extends IconToggleButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled';
    }
}

/*  */


CSS`
button.common {
    --label-icon-disabled: var(--color-on-surface);
    color: rgba(var(--label-icon-color-default), 1);
    background-color: rgba(var(--container-color-default), 1);
    border-radius: 20rem;
    border-style: solid;
    border-width: 0;
    height: 40rem;
    width: fit-content;
    min-width: 48rem;
    padding: 10rem 24rem 10rem 0rem;
}

button.common::before {
    font-family: Icons-Outlined;
    font-size: 18rem;
    line-height: 1;
    padding: 11rem 8rem 11rem 16rem;
    vertical-align: text-bottom;
    content: attr(data-icon);
}

button.common:not(:disabled,:active):hover {
    background-image: linear-gradient(rgba(var(--label-icon-color-default), .08) 0 100%);
}

button.common:not(:disabled):focus,
button.common:not(:disabled):active {
    background-image: linear-gradient(rgba(var(--label-icon-color-default), .12) 0 100%);
}

button.common:disabled {
    color: rgba(var(--label-icon-disabled), .38);
    background-color: rgba(var(--container-disabled), .12);
    border-color: rgba(var(--label-icon-disabled), .12) !important;
    box-shadow: none !important;
}
`

export class CommonButton extends Button {

    constructor(properties) {
        super(properties)
    }

    set icon(str) { this.node.dataset.icon = str; }

    set responsive(bool) {
        this.node.style.width = {
            true: '100%',
            false: 'fit-content'
        }[!!bool];
    }
}


CSS`
button.common.text {
    --label-icon-color-default: var(--color-primary);
}
`

export class TextCommonButton extends CommonButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'common text typeface-plain typescale-label-large';
    }
}


CSS`
button.common.outlined {
    --label-icon-color-default: var(--color-primary);
    border-color: rgba(var(--color-outline), 1);
    border-width: 1rem;
}
`

export class OutlinedCommonButton extends CommonButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'common outlined typeface-plain typescale-label-large';
    }
}


CSS`
button.common.filled-tonal {
    --label-icon-color-default: var(--color-on-secondary-container);
    --container-color-default: var(--color-secondary-container);
    --container-disabled: var(--color-on-surface);
}
`

export class FilledTonalCommonButton extends CommonButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'common filled-tonal typeface-plain typescale-label-large';
    }
}


CSS`
button.common.filled {
    --label-icon-color-default: var(--color-on-primary);
    --container-color-default: var(--color-primary);
    --container-disabled: var(--color-on-surface);
}
`

export class FilledCommonButton extends CommonButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'common filled typeface-plain typescale-label-large';
    }
}


CSS`
button.common.elevated {
    --label-icon-color-default: var(--color-primary);
    --container-color-default: var(--color-surface-container-low);
    --container-disabled: var(--color-on-surface);
    box-shadow: 0 1rem 8rem -5rem rgba(var(--color-shadow), 1);
}
`

export class ElevatedCommonButton extends CommonButton {

    constructor(properties) {
        super(properties)

        this.node.className = 'common elevated typeface-plain typescale-label-large';
    }
}


CSS`
fieldset.segmented {
    border: none;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
    max-width: fit-content;
}

fieldset.segmented legend {
    visibility: hidden;
    position: absolute;
}
`

export class SegmentedButton extends Element {

    static #ref = 0;

    constructor(properties) {

        super(properties, {
            nodeName: 'fieldset',
            className: 'segmented',
            innerHTML: '<legend/>'
        });

        SegmentedButton.#ref += 1;
    }

    set label(str) { this.node.firstElementChild.textContent = str; }

    set segments(arr) {
        console.assert(Array.isArray(arr), 'only <Array> allowed');
        console.assert(arr.every((segment) => {
            return (segment instanceof ButtonSegment);
        }), 'only <ButtonSegment> allowed');

        this.node.replaceChildren(
            this.node.firstElementChild,
            ...arr.map(elem => {
                elem.node.firstElementChild.type = 'radio';
                elem.node.firstElementChild.name = `segmented${SegmentedButton.#ref}`;
                return elem.node;
            })
        );
    }

    set multiSelection(bool) {
        this.node.querySelectorAll('input').forEach(node => {
            node.type = {
                true: 'checkbox',
                false: 'radio'
            }[!!bool];
        })
    }

    set iconsOnly(bool) { this.node.classList.toggle('icons-only', !!bool); }

    set density(num) {
        console.assert([1,2,3].includes(num), 'density: 1..3');

        this.node.classList.toggle(`density${num}`, true);
    }
}

CSS`
label.segment {
    --container-outline-color: var(--color-outline);
    --container-color-selected: var(--color-secondary-container);
    --container-disabled: var(--color-on-surface);
    --icon-color-unselected: var(--color-on-surface);
    --icon-color-selected: var(--color-on-secondary-container);
    --label-color-unselected: var(--color-on-surface);
    --label-color-selected: var(--color-on-secondary-container);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 10rem 20rem;
    margin: 4rem 0 4rem -1rem;
}

.density1 label.segment {
    padding: 8rem 16rem;
}

.density2 label.segment {
    padding: 6rem 12rem;
}

.density3 label.segment {
    padding: 4rem 8rem;
}

label.segment input+span {
    position: relative;
    pointer-events: none; /* prevent dead-zones when :hover */
    color: rgba(var(--label-color-unselected), 1);
}

label.segment input:checked+span {
    color: rgba(var(--label-color-selected), 1);
} 

label.segment input {
    appearance: none;
}

label.segment input::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    content: "";
    border-style: solid;
    border-width: 1rem 0 1rem 1rem;
    border-color: rgba(var(--container-outline-color), 1);
}

label.segment input:checked::before {
    background-color: rgba(var(--container-color-selected), 1);
}

label.segment:first-of-type input::before {
    border-top-left-radius: 20rem;
    border-bottom-left-radius: 20rem;
}

label.segment:last-of-type input::before {
    border-top-right-radius: 20rem;
    border-bottom-right-radius: 20rem;
    border-right-width: 1rem;
}

label.segment input::after {
    color: rgba(var(--icon-color-unselected), 1);
    font-family: Icons-Outlined;
    font-size: 18rem;
    line-height: 1;
    content: attr(data-icon);
    vertical-align: text-bottom;
    position: relative;
    display: inline-block;
    width: 26rem;
}

label.segment input:not(:checked, [data-icon])::after {
    width: 0;
}

/* without icon: add space to prevent width-jumping when selected */
label.segment input:not(:checked, [data-icon])+span::before,
label.segment input:not(:checked, [data-icon])+span::after {
    display: inline-block;
    width: 13rem;
    content: "";
}

label.segment input:checked::after {
    color: rgba(var(--icon-color-selected), 1);
    content: "\\e5ca";
}

.icons-only label.segment span {
    font-size: 0;
}

.icons-only label.segment input::after {
    width: 18rem;
}

/* HOVERED */
label.segment input:not(:disabled):hover::before {
    background-image: linear-gradient(rgba(var(--label-color-unselected), .08) 0 100%);
}

label.segment input:checked:not(:disabled):hover::before {
    background-image: linear-gradient(rgba(var(--label-color-selected), .08) 0 100%);
}

/* ACTIVE, FOCUS */
label.segment input:not(:disabled):focus::before,
label.segment input:not(:disabled):active::before {
    background-image: linear-gradient(rgba(var(--label-color-unselected), .12) 0 100%);
}

/* DISABLED */
label.segment input:disabled::before {
    background-color: transparent;
    border-color: rgba(var(--container-disabled), .12);
}

label.segment input:disabled+span,
label.segment input:disabled::after {
    color: rgba(var(--container-disabled), .38);
}
`

export class ButtonSegment extends ToggleButton {

    constructor(properties) {

        super(properties);

        this.node.className = 'segment typeface-plain typescale-label-large';
    }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }
}


