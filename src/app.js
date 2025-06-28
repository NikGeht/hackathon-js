import './styles.css'
import {ContextMenu} from './menu'
import {TestModule} from './modules/test.module'
import {ClicksModule} from './modules/clicks.module'
import {ShapeModule} from './modules/shape.module'
import { BackgroundModule } from './modules/background.module'

const menu = new ContextMenu('#menu')

menu.add(
    new ClicksModule('clicks', 'Счетчик кликов за последние 3 секунды'),
    new ShapeModule('shape', 'Форма'),
    new BackgroundModule('background', 'Фоновый цвет'),
    new TestModule('test1', 'Test 1'),
        )
