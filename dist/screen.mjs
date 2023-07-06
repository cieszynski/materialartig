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