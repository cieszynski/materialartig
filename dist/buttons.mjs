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
        }`

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

    set checked(bool) { this.node.firstElementChild.checked = !!bool }

    set disabled(bool) { this.node.firstElementChild.disabled = !!bool }

    onclick(e) { console.debug(e) }
}

export class IconButton extends Button {

    static #css = `
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
            --icon-color-default: var(--color-on-surface-variant) !important;
            border-color: rgba(var(--color-outline), 1);
            border-width: 1rem;
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

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon outlined';
    }
}

export class FilledTonalIconButton extends IconButton {

    static #css = `
        button.icon.filled-tonal {
            --icon-color-default: var(--color-on-secondary-container) !important;
            --container-color-default: var(--color-secondary-container);
            --container-color-disabled: var(--color-on-surface);
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
            --icon-color-unselected: var(--color-on-surface-variant);
            --icon-color-selected: var(--color-on-secondary-container);
            --container-color-unselected: var(--color-surface-container-highest);
            --container-color-selected: var(--color-secondary-container);
            --container-color-disabled: var(--color-on-surface);
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
            --icon-color-default: var(--color-on-primary);
            --container-color-default: var(--color-primary);
            --container-color-disabled: var(--color-on-surface);
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
            --icon-color-unselected: var(--color-primary);
            --icon-color-selected: var(--color-on-primary);
            --container-color-unselected: var(--color-surface-container-highest);
            --container-color-selected: var(--color-primary);
            --container-color-disabled: var(--color-on-surface);
        }`

    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'icon filled';
    }
}

/*  */

export class CommonButton extends Button {

    static #css = `
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
    static { super.initonce(this.#css) }

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

export class TextCommonButton extends CommonButton {

    static #css = `
        button.common.text {
            --label-icon-color-default: var(--color-primary);
        }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'common text typeface-plain typescale-label-large';
    }
}

export class OutlinedCommonButton extends CommonButton {

    static #css = `
        button.common.outlined {
            --label-icon-color-default: var(--color-primary);
            border-color: rgba(var(--color-outline), 1);
            border-width: 1rem;
        }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'common outlined typeface-plain typescale-label-large';
    }
}

export class FilledTonalCommonButton extends CommonButton {

    static #css = `
        button.common.filled-tonal {
            --label-icon-color-default: var(--color-on-secondary-container);
            --container-color-default: var(--color-secondary-container);
            --container-disabled: var(--color-on-surface);
        }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'common filled-tonal typeface-plain typescale-label-large';
    }
}

export class FilledCommonButton extends CommonButton {

    static #css = `
        button.common.filled {
            --label-icon-color-default: var(--color-on-primary);
            --container-color-default: var(--color-primary);
            --container-disabled: var(--color-on-surface);
        }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'common filled typeface-plain typescale-label-large';
    }
}

export class ElevatedCommonButton extends CommonButton {

    static #css = `
        button.common.elevated {
            --label-icon-color-default: var(--color-primary);
            --container-color-default: var(--color-surface-container-low);
            --container-disabled: var(--color-on-surface);
            box-shadow: 0 1rem 8rem -5rem rgba(var(--color-shadow), 1);
        }
    `
    static { super.initonce(this.#css) }

    constructor(properties) {
        super(properties)

        this.node.className = 'common elevated typeface-plain typescale-label-large';
    }
}