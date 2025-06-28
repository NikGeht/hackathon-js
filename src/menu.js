import {Menu} from './core/menu'
import {Module} from './core/module'

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector)
        this.modules = []
        this.bindEvents()
    }

    open(event) {
        event.preventDefault();
        this.#render()
        this.el.classList.add('open');
        this.el.style.top = `${event.clientY}px`
        this.el.style.left = `${event.clientX}px`
    }
    
    close() {
        this.el.classList.remove('open')
    }

    add(module) {
        if (module instanceof Module) {
            this.modules.push(module)
        }
    }

    #render() {
        this.el.innerHTML = '';
        for (const module of this.modules) {
            this.el.innerHTML += module.toHTML();
        } 
    }
    
    bindEvents() {
        document.addEventListener('contextmenu', event => this.open(event))
        this.el.addEventListener('click', event => this.handleClick(event))
    }

    handleClick(event) {
        if (event.target.classList.contains('menu-item')) {
            this.modules.find(module => module.type === event.target.dataset.type)?.trigger()
        }
    }

}