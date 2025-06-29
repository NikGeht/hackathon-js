import {Module} from '../core/module'
import {random} from '../utils'

// Import audio files
import audio1 from '../music/1.wav'
import audio2 from '../music/2.wav'
import audio3 from '../music/3.wav'
import audio4 from '../music/4.wav'

export class AudioModule extends Module {
    constructor(type, text) {
        super(type, text)
        this.audioFiles = [audio1, audio2, audio3, audio4]
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
    }

    trigger() {
        const numberMusic = random(1, 4);
        const audio = new Audio(this.audioFiles[numberMusic - 1]);
        audio.play();
        setTimeout(() => audio.load(), 2000)
    } 
}