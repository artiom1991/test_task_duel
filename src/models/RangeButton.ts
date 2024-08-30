import { buttonTipe, player, RangeButtonData } from "../types/types";

//обьявление класса RangeButton для хранения характерных ему параметров
export class RadioButton implements RangeButtonData {
  value: string;
  id: number;
  player: player;
  type: buttonTipe;

  constructor(value: string, id: number, player: player, type: buttonTipe) {
    this.value = value;
    this.id = id;
    this.player = player;
    this.type = type;
  }
}
