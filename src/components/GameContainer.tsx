import { Canvas } from "./Canvas";
import { ColorMenu } from "./ColorMenu";
import { RangeButtons } from "./RangeButton";
import { Score } from "./Score";

//компонент обертка
export const GameCotnainer = (): JSX.Element => {
  return (
    <div className="game-container">
      <Score />
      <Canvas />
      <ColorMenu />
      <RangeButtons />
    </div>
  );
};
