import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    /* Аналитика кликов (за установленное вами время)
При активации модуля начинается отсчет времени, в это время все клики пользователя (двойные и одинарные) считаются. По истечении времени пользователю выводится статистика о том, сколько кликов он сделал. */
    trigger() {
        
        
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
    }
}