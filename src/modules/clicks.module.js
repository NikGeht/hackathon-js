import { Module } from '../core/module';

export class ClicksModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.countClicks = 0;
    this.countClicksDbl = 0;
    this.timeDuration = 3000;
    this.bindedHandleClick = this.handleClick.bind(this);
  }

  trigger() {
    this.startTime = Date.now();
    this.startTracking();
    setTimeout(() => {
      this.endTracking();
    }, this.timeDuration);
  }

  handleClick(event) {
    if (event.type === 'click') {
      this.countClicks++;
    } else if (event.type === 'dblclick') {
      this.countClicksDbl++;
    }
  }

  displayStats() {
    const clicks = this.createStats();
    document.body.append(clicks);
    setTimeout(() => {
      clicks.remove();
    }, 5000);
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }

  startTracking() {
    document.addEventListener('click', this.bindedHandleClick);
    document.addEventListener('dblclick', this.bindedHandleClick);
  }

  endTracking() {
    this.endTime = Date.now();
    this.displayStats();
    document.removeEventListener('click', this.bindedHandleClick);
    document.removeEventListener('dblclick', this.bindedHandleClick);
  }

  createStats() {
    const statsContainer = document.createElement('div');
    const clicksHeader = document.createElement('h3');
    clicksHeader.textContent = 'Статистика кликов:';
    statsContainer.classList.add('clicks-stats');
    statsContainer.append(clicksHeader);
    const clicksStats = document.createElement('span');
    clicksStats.textContent = `Пользователь сделал ${
      this.countClicks
    } кликов и ${this.countClicksDbl} двойных кликов за ${
      this.timeDuration / 1000
    } с`;
    statsContainer.append(clicksStats);

    return statsContainer;
  }
}
