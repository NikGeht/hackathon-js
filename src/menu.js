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
    }

    #render() {
        this.rootContext.innerHTML = '';
        for (const module of this.modules) {
            this.rootContext.innerHTML += module.toHTML();
        } 
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