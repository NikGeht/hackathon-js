import "./styles.css";
import { ContextMenu } from "./menu";
import { ClicksModule } from "./modules/clicks.module";
import { ShapeModule } from "./modules/shape.module";
import { BackgroundModule } from "./modules/background.module";

import { CustomMessageModule } from "./modules/customMessageModule";

const menu = new ContextMenu("#menu");

menu.add(new CustomMessageModule("custom-message", "Кастомное сообщение"));
menu.add(new ClicksModule("clicks", "Счетчик кликов"));
menu.add(new ShapeModule("shape", "Случайная фигура"));
menu.add(new BackgroundModule("background", "Случайный фон"));
