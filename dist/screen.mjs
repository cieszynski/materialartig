/* screen.mjs */
import {
    CSS,
    Component
} from '/common.mjs'

CSS`
dialog.screen {
    border: 0;
    width: 100%;
    height: 100vh;
    max-width: 100%; /* overwrite user agent style! */
    max-height: 100%; /* overwrite user agent style! */
}

dialog.screen::backdrop {
    background: none;
}
`

export class Screen extends Component {

    constructor(properties) {
        super(properties, {
            nodeName: 'dialog',
            className: 'screen'
        });

        this.node.onkeydown = (e) => {
            if (e.keyCode === 27) {
                e.preventDefault();
                this.hide();
            }
        }
    }

    set child(elem) {
        //console.assert
        this.node
            .replaceChildren(elem.node);
    }

    show() {
        this.node.showModal();
        this.node.animate([
            { transform: "translateX(100%)" },
            { transform: "translateX(0)" }
        ],
            {
                easing: "ease-in-out",
                duration: 300,
                fill: "forwards"
            })
    }

    hide() {
        this.node.animate([
            { transform: "translateX(0)" },
            { transform: "translateX(100%)" }
        ],
            {
                easing: "ease-in-out",
                duration: 300,
                fill: "forwards"
            }).finished.then(() => {
                this.node.close();
            })
    }
}

export class SettingsScreen extends Component {

    constructor(properties) {
        super(properties, {
            nodeName: 'dialog',
            innerHTML: '<div/>',
            className: 'screen'
        });
    }
}