import { ProjectileData, player } from "../types/types";

//обьединение всех параметров которыми должен обладать снаряд в класс Projectile
export class Projectile implements ProjectileData {
  radius: number;
  posX: number;
  posY: number;
  speed: number;
  color: string;
  emiter: player;
  target: player;

  constructor(radius: number, posX: number, posY: number, speed: number, color: string, emiter: player, target: player) {
    this.radius = radius;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.color = color;
    this.emiter = emiter;
    this.target = target;
  }
}
