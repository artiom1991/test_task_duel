import { GameData, GameFieldData, RangeButtons, ScoreData, ColorMenuData, Players, Projectiles, CursorPosition } from "../types/types";

//обьединение всех классов в одну общую сущнось приложения Game
export class Game implements GameData {
  field: GameFieldData;
  players: Players;
  projectiles: Projectiles;
  buttonList: RangeButtons;
  score: ScoreData;
  colorMenu: ColorMenuData;
  cursorPosition: CursorPosition;

  constructor(
    field: GameFieldData,
    players: Players,
    projectiles: Projectiles,
    buttonList: RangeButtons,
    score: ScoreData,
    contextMenu: ColorMenuData,
    cursorPosition: CursorPosition
  ) {
    this.field = field;
    this.players = players;
    this.projectiles = projectiles;
    this.buttonList = buttonList;
    this.score = score;
    this.colorMenu = contextMenu;
    this.cursorPosition = cursorPosition;
  }
}
