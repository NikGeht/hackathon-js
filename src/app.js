import './styles.css';
import { ContextMenu } from './menu';
import { TestModule } from './modules/test.module';
import { ClicksModule } from './modules/clicks.module';
import { ShapeModule } from './modules/shape.module';
import { BackgroundModule } from './modules/background.module';
import { CountdownTimerModule } from './modules/timer.module';
import { Calculator } from './modules/calculator.module';

const menu = new ContextMenu('#menu');

menu.add(new ClicksModule('clicks', 'Счетчик кликов за последние 3 секунды'));
menu.add(new ShapeModule('shape', 'Форма'));
menu.add(new BackgroundModule('background', 'Фоновый цвет'));
menu.add(new CountdownTimerModule('timer', 'Таймер'));
menu.add(new TestModule('test1', 'Test 1'));

menu.add(new Calculator('calc', 'Калькулятор'));
