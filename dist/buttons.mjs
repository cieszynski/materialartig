/* buttons.mjs */
import {
    Element
} from '/application.mjs'

export class Button extends Element {

    static #css = `
        button {
            border: none;
            background: none;
        }`

    static { super.initonce(this.#css) }

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

export class ToggleButton extends Element {

    static #css = `
    label input {
        appearance: none;
    }
    `

    static { super.initonce(this.#css) }

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

    set disabled(bool) { this.node.firstElementChild.disabled = !!bool }

    onclick(e) { console.debug(e) }
}

export class IconButton extends Button {

    static #css = `
        button.icon {   
            font-size: 0;     
            width: 40rem;
            height: 40rem;
            border-radius: 20rem;
        }

        button.icon::after {
            font-family: Icons-Outlined;
            content: attr(data-icon);
            line-height: 1.6;
            font-weight: 500;
            font-size: 24rem;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties);

        this.node.className = 'icon';
    }

    set icon(str) { this.node.dataset.icon = str; }
}

export class IconToggleButton extends ToggleButton {
    static #css = `
        label.icon {   
            font-size: 0;     
            width: 40rem;
            height: 40rem;
            border-radius: 20rem;
        }

        label.icon input {
            width: 100%;
            height: 100%;
            text-align: center;
        }

        label.icon input::after {
            font-family: Icons-Outlined;
            content: attr(data-icon);
            line-height: 1.6;
            font-weight: 500;
            font-size: 24rem;
        }

        label.icon input:checked::after {
            color: red;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon';
    }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; }
}

export class OutlinedIconButton extends IconButton {

    static #css = `
        button.icon.outlined {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon outlined';
    }
}

export class OutlinedIconToggleButton extends IconToggleButton {

    static #css = `
        label.icon.outlined {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon outlined';
    }
}

export class FilledTonalIconButton extends IconButton {

    static #css = `
        button.icon.filled-tonal {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled-tonal';
    }
}

export class FilledTonalIconToggleButton extends IconToggleButton {

    static #css = `
        label.icon.filled-tonal {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled-tonal';
    }
}

export class FilledIconButton extends IconButton {

    static #css = `
        button.icon.filled {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled';
    }
}

export class FilledIconToggleButton extends IconToggleButton {

    static #css = `
        label.icon.filled {
            border: 1rem solid black;
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled';
    }
}