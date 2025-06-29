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
        this.#calculatePosition(event);
    }
    
    close() {
        this.el.classList.remove('open')
    }

    add(module) {
        if (module instanceof Module) {
            this.modules.push(module)
        }
    }
    
    #calculatePosition(event) {
        let X = event.clientX;
        let Y = event.clientY;
        const contextWidth = this.el.offsetWidth;
        const contextHeight = this.el.offsetHeight;
        const windowWidth = window.innerWidth - 10;
        const windowHeight = window.innerHeight - 10;
        if (event.clientX + contextWidth > windowWidth) {
            X = X - contextWidth;
        }
        if (event.clientY + contextHeight > windowHeight) {
            Y = Y - contextHeight;
        }
        this.el.style.top = `${Y}px`
        this.el.style.left = `${X}px`
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