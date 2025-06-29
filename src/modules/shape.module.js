import { Module } from '../core/module';
import { random, randomColor } from '../utils';

export class ShapeModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.shapeArr = ['square', 'circle', 'triangle', 'rectangle'];
        this.shapeGenerators = {
            square: () => ({
                width: random(50, 150) + 'px',
                height: random(50, 150) + 'px',
                backgroundColor: randomColor(),
                border: '1px solid black',
                transform: `rotate(${random(0, 360)}deg)`
            }),
            
            circle: () => ({
                width: random(50, 150) + 'px',
                height: random(50, 150) + 'px',
                border: '1px solid black',
                borderRadius: '50%',
                backgroundColor: randomColor(),
                transform: `rotate(${random(0, 360)}deg)`
            }),
            
            triangle: () => ({
                width: 0,
                height: 0,
                borderLeft: `${random(25, 75)}px solid transparent`,
                borderRight: `${random(25, 75)}px solid transparent`,
                borderBottom: `${random(50, 150)}px solid ${randomColor()}`,
                transform: `rotate(${random(0, 360)}deg)`,
            }),
            
            rectangle: () => ({
                width: random(80, 200) + 'px',
                height: random(40, 100) + 'px',
                backgroundColor: randomColor(),
                transform: `rotate(${random(0, 360)}deg)`,
                border: '1px solid black',
                borderRadius: '10px'
            })
        };
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
    }


    getRandomShape() {
        const randomIndex = Math.floor(Math.random() * this.shapeArr.length);
        return this.shapeArr[randomIndex];
    }

    trigger() {
        const shapeContainer = this.createShape();
        document.body.append(shapeContainer);
        console.log(shapeContainer);
        setTimeout(() => {
            shapeContainer.remove();
        }, 3000);
    }

    createShape() {
        const shapeContainer = document.createElement('div');
        shapeContainer.classList.add('shape-container');
   
        const shape = this.getRandomShape();
        const shapeStyle = this.shapeGenerators[shape]();
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape');
        Object.assign(shapeElement.style, shapeStyle);

        const { shapeTop, shapeLeft } = this.getRandomPosition(shapeElement);
        shapeElement.style.top = `${shapeTop}px`;
        shapeElement.style.left = `${shapeLeft}px`;
        shapeContainer.append(shapeElement);

        return shapeContainer;
    }

    getRandomPosition(shapeElement) {
        let shapeTop = random(0, window.innerHeight - shapeElement.offsetHeight - 200);
        let shapeLeft = random(0, window.innerWidth - shapeElement.offsetWidth - 200);
        if (shapeTop + shapeElement.offsetHeight > window.innerHeight) {
            shapeTop = shapeTop - shapeElement.offsetHeight;
        }
        if (shapeLeft + shapeElement.offsetWidth > window.innerWidth) {
            shapeLeft = shapeLeft - shapeElement.offsetWidth;
        }
        return { shapeTop, shapeLeft };
    }
}
