import {Module} from '../core/module'

export class AudioModule extends Module {
    constructor(type, text) {
        super(type, text)
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
    }

    trigger() {
        const numberMusic = this.getRandomInt (1, 4)
        const audio = new Audio(`../src/music/${numberMusic}.wav`);
        audio.play();
  }

    getRandomInt(min, max) {  
    min = Math.ceil(min);  
    max = Math.floor(max);  
    return Math.floor(Math.random() * (max - min + 1)) + min;  
} 


}