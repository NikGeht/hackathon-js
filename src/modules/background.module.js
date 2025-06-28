//================<Свистелки в наличии>==================

import { Module } from '../core/module';

export class BackgroundModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.storageKey = 'savedColors';
    this.colorsPanel = null;
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  saveCurrentColor() {
    const currentColor = document.body.style.backgroundColor || '#ffffff';
    let savedColors = JSON.parse(localStorage.getItem(this.storageKey)) || [];

    if (!savedColors.includes(currentColor)) {
      savedColors.unshift(currentColor);
      savedColors = savedColors.slice(0, 5);
      localStorage.setItem(this.storageKey, JSON.stringify(savedColors));
      this.updateColorsDisplay();
    }
  }

  updateColorsDisplay() {
    if (!this.colorsPanel) return;

    const colorBoxes = this.colorsPanel.querySelectorAll('.color-box');
    colorBoxes.forEach((box) => box.remove());

    const savedColors = JSON.parse(localStorage.getItem(this.storageKey)) || [];

    savedColors.forEach((color) => {
      const colorBox = document.createElement('div');
      colorBox.className = 'color-box';
      colorBox.style.backgroundColor = color;
      colorBox.title = color;

      colorBox.addEventListener('click', () => {
        document.body.style.backgroundColor = color;
      });

      this.colorsPanel.appendChild(colorBox);
    });
  }

  initColorsPanel() {
    this.colorsPanel = document.createElement('div');
    this.colorsPanel.className = 'color-controls';

    const saveButton = document.createElement('button');
    saveButton.className = 'save-btn';
    saveButton.textContent = 'Нраица';
    saveButton.title = 'Сохранить текущий цвет';

    saveButton.addEventListener('click', () => {
      this.saveCurrentColor();
    });

    this.colorsPanel.appendChild(saveButton);
    document.body.appendChild(this.colorsPanel);

    this.updateColorsDisplay();
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }

  trigger() {
    if (!this.colorsPanel) {
      this.initColorsPanel();
    }

    const color = this.getRandomColor();
    document.body.style.backgroundColor = color;
  }
}

//================<Без свистелок>==================

// import { Module } from '../core/module';

// export class BackgroundModule extends Module {
//   constructor(type, text) {
//     super(type, text);
//   }
//   getRandomColor() {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }

//   toHTML() {
//     return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
//   }

//   trigger() {
//     const color = this.getRandomColor();
//     document.body.style.backgroundColor = color;
//     console.log('Random color triggered');
//   }
// }
