export type cursorPosition = "clientX" | "clientY";
export type player = "player_1" | "player_2";
export type buttonTipe = "move_speed" | "projectile_speed";
export type direction = "up" | "down";
export type Players = { [key in player]: PlayerData };
export type color =
  | "white"
  | "black"
  | "yellow"
  | "purple"
  | "coral"
  | "crimson"
  | "darkgoldenrod"
  | "darkslateblue"
  | "aqua"
  | "blue"
  | "brown"
  | "cadetblue"
  | "greenyellow"
  | "mediumslateblue"
  | "teal";

export type projectileColor = {
  [key in player]: color;
};

export type RangeButtons = {
  [key in player]: {
    [key in buttonTipe]: RangeButtonData;
  };
};

export type Projectiles = {
  [key in player]: ProjectileData[];
};

export type CursorPosition = {
  [key in cursorPosition]: number;
};

export interface PlayerData {
  name: player;
  radius: number;
  posX: number;
  posY: number;
  speed: number;
  moveDirection: direction;
  score: number;
}

export interface ProjectileData {
  radius: number;
  posX: number;
  posY: number;
  speed: number;
  color: string;
  emiter: player;
  target: player;
}

export interface GameFieldData {
  width: number;
  height: number;
}

export interface ColorMenuData {
  width: number;
  height: number;
  posX: number;
  posY: number;
  projectilesColor: projectileColor;
  player: player;
  isActive: boolean;
}

export interface ScoreData {
  player_1: number;
  player_2: number;
}

export interface RangeButtonData {
  value: string;
  id: number;
  player: player;
  type: buttonTipe;
}

export interface GameData {
  field: GameFieldData;
  players: Players;
  projectiles: Projectiles;
  buttonList: RangeButtons;
  score: ScoreData;
  colorMenu: ColorMenuData;
  cursorPosition: CursorPosition;
}

export interface GameProviderData {
  getApp: GameData;
  setApp: (props: GameData) => void;
}
