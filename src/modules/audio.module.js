import {Module} from '../core/module'
import {random} from '../utils'

export class AudioModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
    }

    trigger() {
        const numberMusic = random(1, 4);
        const audio = new Audio(`../src/music/${numberMusic}.wav`);
        audio.play();
        console.log (audio)
        setTimeout (() => audio.load(), 2000)
  } 

}