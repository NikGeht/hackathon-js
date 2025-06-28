import {Menu} from './core/menu'

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector)
        this.modules = []
        this.rootContext = document.querySelector(selector)
        this.bind()
    }

    open(event) {
        event.preventDefault();
        this.rootContext.classList.add('open');
        this.rootContext.style.top = `${event.clientY}px`
        this.rootContext.style.left = `${event.clientX}px`
    }
    
    close() {
        this.rootContext.classList.remove('open')
    }

    add(modules) {
        this.modules.push(...modules)
        this.#render()
        console.log(this.modules)
    }

    #render() {
        this.rootContext.innerHTML = this.modules.map(module => module.toHTML()).join('');
    }
    
    bind() {
        document.addEventListener('contextmenu', event => this.open(event))
        document.addEventListener('click', event => this.handleClick(event))
    }

    handleClick(event) {
        if (event.target.classList.contains('menu-item')) {
            this.modules.find(module => module.type === event.target.dataset.type).trigger()
        }
    }

}