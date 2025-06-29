import {Module} from '../core/module'

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.countClicks = 0;
        this.isTracking = false;
        this.countClicksDbl = 0;
        this.timeDuration= 3000;
        this.timerInterval = null;
        this.timerElement = null;
        this.bindedHandleClick = this.handleClick.bind(this);
    }

    trigger() {
        if (this.isTracking) return
        this.startTime = Date.now();
        this.startTracking();
        setTimeout(() => {
            this.endTracking();
        }, this.timeDuration + 1000)
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
        }, 5000)
    }

    displayTimer() {
        this.timerElement = this.createTimer();
        document.body.append(this.timerElement);
        this.timerElement.querySelector('.timer-container__timer').textContent = `Времени осталось: ${(timeDuration) / 1000}`;
        
        this.timerElement.classList.remove('timer-container--warning', 'timer-container--danger');
        let timeDuration = this.timeDuration;
        this.timerInterval = setInterval(() => {
            console.log(timeDuration)
            if (timeDuration > 2000) {
                this.timerElement.classList.add('timer-container--normal');
            }
            else if (timeDuration > 1000) {
                this.timerElement.classList.add('timer-container--warning');
            } else {
                this.timerElement.classList.add('timer-container--danger');
            }

            
            this.timerElement.querySelector('.timer-container__timer').textContent = `Времени осталось: ${(timeDuration) / 1000}`;
            timeDuration -= 1000;
            
            if (timeDuration < 0) {
                clearInterval(this.timerInterval);
                return;
            }
        }, 1000)
            
    }

    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
    }

    async startTracking() {
        await this.displayTimer();
        this.isTracking = true;
        this.countClicks = 0;
        this.countClicksDbl = 0;
        document.addEventListener('click', this.bindedHandleClick);
        document.addEventListener('dblclick', this.bindedHandleClick);
    }

    endTracking() {
        this.isTracking = false;
        this.timerElement.remove();
        this.endTime = Date.now();
        this.displayStats();
        try {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            document.removeEventListener('click', this.bindedHandleClick);
            document.removeEventListener('dblclick', this.bindedHandleClick);
        } catch (error) {
            console.log(error);
        }
    }

    createStats() {
        const statsContainer = document.createElement('div');
        const clicksHeader = document.createElement('h3');
        clicksHeader.textContent = 'Статистика кликов:';
        statsContainer.classList.add('clicks-stats');
        statsContainer.append(clicksHeader);
        const clicksStats = document.createElement('span');
        clicksStats.textContent = `Пользователь сделал ${this.countClicks} кликов и ${this.countClicksDbl} двойных кликов за ${this.timeDuration / 1000} с`;
        statsContainer.append(clicksStats);
        
        return statsContainer;
    }

    createTimer() {
        const timerContainer = document.createElement('div');
        timerContainer.className = 'timer-container';
        timerContainer.classList.add('timer-container--normal');
        const timerHeader = document.createElement('h3');
        timerHeader.className = 'timer-container__header';
        timerHeader.textContent = 'Таймер';
        const timer = document.createElement('span');
        timer.className = 'timer-container__timer';

        timerContainer.append(timerHeader, timer);
        return timerContainer;
    }
}