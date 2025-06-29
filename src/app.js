
import './styles.css';
import { ContextMenu } from './menu';
import { TestModule } from './modules/test.module';
import { ClicksModule } from './modules/clicks.module';
import { ShapeModule } from './modules/shape.module';
import { BackgroundModule } from './modules/background.module';
import { CountdownTimerModule } from './modules/timer.module';
import { AudioModule } from './modules/audio.module'


const menu = new ContextMenu('#menu');


menu.add(new ClicksModule('clicks', 'Счетчик кликов за последние 3 секунды'));
menu.add(new ShapeModule('shape', 'Форма'));
menu.add(new BackgroundModule('background', 'Фоновый цвет'));
menu.add(new AudioModule('audio', 'Рандомный звук'));
menu.add(new CountdownTimerModule('timer', 'Таймер'));

