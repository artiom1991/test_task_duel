import { useContext } from "react";
import { GameContext } from "./GameProvider";

//простой компонент который хранит и отрисовывает состояние счета
export const Score = () => {
  const context = useContext(GameContext);
  if (!context) {
    return;
  }
  const score = context.getApp.score;

  return (
    <div className="score-container">
      <h1 className="score-header">
        {score.player_1}:{score.player_2}
      </h1>
    </div>
  );
};
