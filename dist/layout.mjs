/* layout.mjs */
import {
    CSS,
    Widget
} from '/common.mjs'

export class Layout extends Widget {

}

CSS``
export class ListDetailLayout extends Layout {
    
    constructor(properties) {
        super(properties, {
            nodeName: 'section',
            className: 'listdetail',
            innerHTML: `
                <header>
                    <h1>ListDetailLayout</h1>
                </header>
            `
        });
    }
}

CSS``
export class PaneLayout extends Layout {
    
}

CSS``
export class FeedLayout extends Layout {
    
}