import { PlayerData, direction, player } from "../types/types";

//обьединение всех параметров которыми должен обладать игрок в класс Player
export class Player implements PlayerData {
  name: player;
  radius: number;
  posX: number;
  posY: number;
  speed: number;
  moveDirection: direction;
  score: number;

  constructor(name: player, radius: number, posX: number, posY: number, speed: number, moveDirection: direction, score: number) {
    this.name = name;
    this.radius = radius;
    this.posX = posX;
    this.posY = posY;
    this.speed = speed;
    this.moveDirection = moveDirection;
    this.score = score;
  }
}
