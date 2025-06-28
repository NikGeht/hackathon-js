import { Module } from "../core/module";

export class CustomMessageModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    const messages = [
      "Код пишется сам собой!",
      "Ты - фронтенд волшебник!",
      "Контекстное меню рулит!",
      "Git и GitHub - лучшие друзья",
      "Этот хакатон - просто космос!",
    ];

    const message = document.createElement("div");
    message.className = "custom-message";
    message.textContent = messages[Math.floor(Math.random() * messages.length)];

    const maxX = window.innerWidth - 300;
    const maxY = window.innerHeight - 150;
    const posX = Math.max(20, Math.floor(Math.random() * maxX));
    const posY = Math.max(20, Math.floor(Math.random() * maxY));

    const hue = Math.floor(Math.random() * 360);

    message.style.cssText = `
      position: fixed;
      left: ${posX}px;
      top: ${posY}px;
      padding: 15px 25px;
      background: hsl(${hue}, 70%, 50%);
      color: white;
      border-radius: 12px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      font-size: 18px;
      font-weight: 500;
      animation: fadeIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      max-width: 260px;
      text-align: center;
      line-height: 1.4;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = "fadeOut 0.5s ease forwards";
      setTimeout(() => message.remove(), 600);
    }, 3000);
  }
}
