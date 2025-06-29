//================<Свистелки в наличии>==================

import { Module } from '../core/module';
import soundUrl from '../assets/sounds/come_on.mp3';

export class CountdownTimerModule extends Module {
  constructor(type, text) {
    super(type, text);
    this.timerContainer = null;
    this.currentInterval = null;
    this.audio = new Audio(soundUrl);
    this.audio.volume = 0.4;
    this.audio.preload = 'auto';
  }

  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
  }

  userTimerInput() {
    const userInput = prompt('Введите время в секундах:', '10');
    const seconds = parseInt(userInput);

    if (this.timerContainer) {
      alert('Дождитесь завершения текущего таймера!');
      return;
    }

    if (isNaN(seconds)) {
      alert('Введите число!');
      return;
    }

    this.createTimer(seconds);
  }

  createTimer(seconds) {
    this.timerContainer = document.createElement('div');
    this.timerContainer.className = 'countdown-timer';

    document.body.appendChild(this.timerContainer);

    let remainingTime = seconds;
    this.updateTimerDisplay(remainingTime);

    this.currentInterval = setInterval(() => {
      remainingTime--;
      this.updateTimerDisplay(remainingTime);

      if (remainingTime <= 0) {
        this.timerComplete();
      }
    }, 1000);
  }

  updateTimerDisplay(seconds) {
    this.timerContainer.textContent = `Осталось: ${seconds} сек.`;
  }

  async timerComplete() {
    clearInterval(this.currentInterval);
    this.timerContainer.textContent = 'Твое время вышло!';
    this.timerContainer.style.backgroundColor = '#ff5e4d';

    try {
      await this.audio.play();
      await new Promise((resolve) => {
        this.audio.addEventListener('ended', resolve, { once: true });
      });
    } catch (err) {
      console.log('Звук не воспроизведён');
    } finally {
      setTimeout(() => {
        this.timerContainer.remove();
        this.timerContainer = null;
      }, 100);
    }
  }
  trigger() {
    this.userTimerInput();
    console.log('Timer triggered');
  }
}

//================<Без свистелок>==================

// import { Module } from '../core/module';

// export class CountdownTimerModule extends Module {
//   constructor(type, text) {
//     super(type, text);
//     this.timerContainer = null;
//     this.currentInterval = null;
//   }

//   toHTML() {
//     return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`;
//   }

//   userTimerInput() {
//     const userInput = prompt('Введите время в секундах:', '10');
//     const seconds = parseInt(userInput);

//     if (this.timerContainer) {
//       alert('Дождитесь завершения текущего таймера!');
//       return;
//     }

//     if (isNaN(seconds)) {
//       alert('Введите число!');
//       return;
//     }

//     this.createTimer(seconds);
//   }

//   createTimer(seconds) {
//     this.timerContainer = document.createElement('div');
//     this.timerContainer.className = 'countdown-timer';

//     document.body.appendChild(this.timerContainer);

//     let remainingTime = seconds;
//     this.updateTimerDisplay(remainingTime);

//     this.currentInterval = setInterval(() => {
//       remainingTime--;
//       this.updateTimerDisplay(remainingTime);

//       if (remainingTime <= 0) {
//         this.timerComplete();
//       }
//     }, 1000);
//   }

//   updateTimerDisplay(seconds) {
//     this.timerContainer.textContent = `Осталось: ${seconds} сек.`;
//   }

//   timerComplete() {
//     clearInterval(this.currentInterval);
//     this.timerContainer.textContent = 'Время вышло!';
//     this.timerContainer.style.backgroundColor = '#e74c3c';

//     setTimeout(() => {
//       this.timerContainer.remove();
//       this.timerContainer = null;
//       this.currentInterval = null;
//     }, 3000);
//   }
//   trigger() {
//     this.userTimerInput();
//     console.log('Timer triggered');
//   }
// }
