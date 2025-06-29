import { Module } from '../core/module';

export class Calculator extends Module {
  constructor(type, text) {
    super(type, text);
    this.calculator = null;
    this.display = null;
    this.isVisible = false;
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }

  createCalculator() {
    if (this.calculator) return;
    this.calculator = document.createElement('div');
    this.calculator.className = 'calculator right-center';

    this.display = document.createElement('input');
    this.display.type = 'text';
    this.display.className = 'calculator-display';
    this.display.disabled = true;
    this.calculator.appendChild(this.display);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'calculator-buttons';

    const buttons = [
      { value: '7', text: '7' },
      { value: '8', text: '8' },
      { value: '9', text: '9' },
      { value: '/', text: '/' },
      { value: '4', text: '4' },
      { value: '5', text: '5' },
      { value: '6', text: '6' },
      { value: '*', text: '×' },
      { value: '1', text: '1' },
      { value: '2', text: '2' },
      { value: '3', text: '3' },
      { value: '-', text: '-' },
      { value: '0', text: '0' },
      { value: '.', text: '.' },
      { cls: 'calculator-clear', text: 'C' },
      { value: '+', text: '+' },
      { cls: 'calculator-equals', text: '=', colspan: 4 },
    ];

    buttons.forEach((btn) => {
      const button = document.createElement('button');
      button.textContent = btn.text;
      button.className = 'calculator-btn';

      if (btn.value) {
        button.dataset.value = btn.value;
      }

      if (btn.cls) {
        button.classList.add(btn.cls);
      }

      if (btn.colspan) {
        button.style.gridColumn = `span ${btn.colspan}`;
      }

      buttonsContainer.appendChild(button);
    });

    this.calculator.appendChild(buttonsContainer);
    document.body.appendChild(this.calculator);

    buttonsContainer.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      if (button.dataset.value) {
        this.display.value += button.dataset.value;
      } else if (button.classList.contains('calculator-clear')) {
        this.display.value = '';
      } else if (button.classList.contains('calculator-equals')) {
        const expression = this.display.value.replace(/×/g, '*');
        this.display.value = eval(expression);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (this.isVisible) {
        if (e.key >= '0' && e.key <= '9') {
          this.display.value += e.key;
        } else if (['+', '-', '*', '/', '.'].includes(e.key)) {
          this.display.value += e.key;
        } else if (e.key === 'Enter') {
          const expression = this.display.value.replace(/×/g, '*');
          this.display.value = eval(expression);
        } else if (e.key === 'Escape') {
          this.closeCalculator();
        } else if (e.key === 'Backspace') {
          this.display.value = this.display.value.slice(0, -1);
        }
      }
    });
  }

  toggleCalculator() {
    if (!this.calculator) {
      this.createCalculator();
    }

    this.isVisible = !this.isVisible;
    this.calculator.style.display = this.isVisible ? 'block' : 'none';

    if (this.isVisible) {
      this.display.focus();
    } else {
      this.display.value = '';
    }
  }

  closeCalculator() {
    if (this.calculator) {
      this.isVisible = false;
      this.calculator.style.display = 'none';
    }
  }

  trigger() {
    this.toggleCalculator();
  }
}
