import { createContext, ReactNode, useState } from "react";
import { Game } from "../models/Game";
import { ColorMenu } from "../models/ColorMenu";
import { Score } from "../models/Score";
import { RadioButton } from "../models/RangeButton";
import { Player } from "../models/Player";
import {
  ColorMenuData,
  GameData,
  GameFieldData,
  GameProviderData,
  Players,
  RangeButtons,
  ScoreData,
  Projectiles,
  CursorPosition,
} from "../types/types";

//создание контекста приложения
export const GameContext = createContext<GameProviderData | undefined>(undefined);

//создаем провайдер и инициализируем данные для контекста
export const GameProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const field: GameFieldData = { width: 800, height: 400 };
  const projectiles: Projectiles = { player_1: [], player_2: [] };

  const buttonList: RangeButtons = {
    player_1: {
      move_speed: new RadioButton("2", 1, "player_1", "move_speed"),
      projectile_speed: new RadioButton("2", 2, "player_1", "projectile_speed"),
    },
    player_2: {
      move_speed: new RadioButton("2", 3, "player_2", "move_speed"),
      projectile_speed: new RadioButton("2", 4, "player_2", "projectile_speed"),
    },
  };

  const players1: Players = {
    player_1: new Player("player_1", 75, 100, 200, parseInt(buttonList.player_1.move_speed.value), "up", 0),
    player_2: new Player("player_2", 75, 700, 200, parseInt(buttonList.player_1.move_speed.value), "down", 0),
  };

  const cursorPosition: CursorPosition = { clientX: 0, clientY: 0 };

  const score: ScoreData = new Score(0, 0);
  const contextMenu: ColorMenuData = new ColorMenu(100, 100, 0, 0, { player_1: "coral", player_2: "purple" }, "player_1", false);
  const game = new Game(field, players1, projectiles, buttonList, score, contextMenu, cursorPosition);
  const [getApp, setApp] = useState<GameData>(game);
  const provider: GameProviderData = { getApp: getApp, setApp: setApp };

  return <GameContext.Provider value={provider}>{children}</GameContext.Provider>;
};
