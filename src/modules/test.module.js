import {Module} from '../core/module'

export class TestModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
    }

    trigger() {
        console.log('TestModule triggered')
    }
}