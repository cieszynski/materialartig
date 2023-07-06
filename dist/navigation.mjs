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
} from '/common.mjs'
import {
    ToggleButton
} from '/button.mjs'

export class NavigationManager {

    static routes = []
}

CSS`
label.navbutton {                                           /* Container */
    display: block;
    position: relative;
    transition: all .3s;
}

label.navbutton input {
    font-family: Icons-Outlined;
    font-size: 24rem;
    line-height: 1; /* Firefox-hack to verticaly align icon */
}

label.navbutton input:checked {
    font-family: Icons;
}

label.navbutton input::before {                             /* Active indicator */
    content: "";
    display: block;
    transition: all .3s;
}

label.navbutton input:checked::before {
    background-color: rgba(var(--color-secondary-container), 1);
}

label.navbutton input::after {                              /* Icon */
    position: absolute;
    content: attr(data-icon);
    color: rgba(var(--color-on-surface-variant), 1);
    transition: all .3s;
}

label.navbutton input:checked::after { 
    color: rgba(var(--color-on-secondary-container), 1);
}

label.navbutton span {                                      /* Label text  */
    position: absolute;
    color: rgba(var(--color-on-surface-variant), 1);
    font: var(--typescale-label-medium);
    letter-spacing: var(--typescale-label-medium-tracking);
    pointer-events: none;
    transition: all .3s;
}

label.navbutton input:checked+span {  
    color: rgba(var(--color-on-secondary-container), 1);
}

label.navbutton input:hover::before {
    background-image: linear-gradient(rgba(var(--color-on-surface), .08) 0 100%);
}

label.navbutton input:focus::before,
label.navbutton input:active::before {
    background-image: linear-gradient(rgba(var(--color-on-surface), .12) 0 100%);
}
                                                            /* NAVIGATION BAR */
body.bar
 label.navbutton,
body.compact:not(.rail)
 label.navbutton {
    height: 80rem;
}

body.bar
 label.navbutton input::before,
body.compact:not(.rail)
 label.navbutton input::before {
    margin: 12rem auto 4rem auto;
    width: 64rem;
    height: 32rem;
    border-radius: 16rem;
}

body.bar
 label.navbutton input::after,
body.compact:not(.rail)
 label.navbutton input::after {
    width: 100%;
    top: 16rem;
    text-align: center;
}
body.bar
 label.navbutton span,
body.compact:not(.rail)
 label.navbutton span {
    top: 48rem;
    left: 0;
    width: 100%;
    text-align: center;
}

                                                            /* NAVIGATION RAIL */
body.rail
 label.navbutton,
body.medium:not(.bar)
 label.navbutton {
    width: 80rem;
    height: 56rem;
}
body.rail
 label.navbutton input::before,
body.medium:not(.bar)
 label.navbutton input::before { 
    margin: 0 12rem 4rem 12rem ;
    width: 56rem;
    height: 32rem;
    border-radius: 16rem;
}
body.rail
 label.navbutton input::after,
body.medium:not(.bar)
 label.navbutton input::after {
    width: 100%;
    top: 4rem;
    text-align: center;
}

body.rail
 label.navbutton span,
body.medium:not(.bar)
 label.navbutton span {
    top: 36rem;
    left: 0;
    width: 100%;
    text-align: center;
}

                                                            /* FULL DRAWER */
body.expanded:not(.bar, .rail)
 label.navbutton {
    width: 360rem;
    height: 56rem;
}

body.expanded:not(.bar, .rail)
 label.navbutton input::before { 
    margin: 0 12rem;
    width: 336rem;
    height: 56rem;
    border-radius: 28rem;
}

body.expanded:not(.bar, .rail)
 label.navbutton input::after {
    width: 24rem;
    top: 14rem;
    left: 28rem;
}

body.expanded:not(.bar, .rail)
 label.navbutton span {
    font: var(--typescale-title-small);
    letter-spacing: var(--typescale-title-small-tracking);
    top: 18rem;
    left: 64rem;
    width: 224rem;
}


`
export class NavButton extends ToggleButton {

    constructor(properties) {

        super(properties);

        this.node.firstElementChild.type = 'radio';
        this.node.firstElementChild.name = 'navbuttons';
        this.node.className = 'navbutton typeface-plain typescale-label-medium';
    }

    set icon(str) { this.node.firstElementChild.dataset.icon = str; } 
}