import { ColorMenuData, player, projectileColor } from "../types/types";

//обьединение всех нужных параметров сущьности colorMenu в отдельный класс для простой манипуляции
export class ColorMenu implements ColorMenuData {
  width: number;
  height: number;
  posX: number;
  posY: number;
  projectilesColor: projectileColor;
  player: player;
  isActive: boolean;

  constructor(width: number, height: number, posX: number, posY: number, projectilesColor: projectileColor, player: player, isActive: boolean) {
    this.width = width;
    this.height = height;
    this.posX = posX;
    this.posY = posY;
    this.projectilesColor = projectilesColor;
    this.player = player;
    this.isActive = isActive;
  }
}
