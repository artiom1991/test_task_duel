import { ScoreData } from "../types/types";

//обьединение структуры счета в общий класс для простой манипуляции
export class Score implements ScoreData {
  player_1: number;
  player_2: number;

  constructor(player_1: number, player_2: number) {
    this.player_1 = player_1;
    this.player_2 = player_2;
  }
}
