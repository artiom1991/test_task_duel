import { useState, useEffect, ChangeEvent } from "react";
import { useContext } from "react";
import { GameContext } from "./GameProvider";
import { player, RangeButtonData } from "../types/types";

//компонент range который на вход получает данные определяющие какие данные он будет изменять и для какого из герове
export const RangeInput = ({ rangeData }: { rangeData: RangeButtonData }): JSX.Element => {
  const context = useContext(GameContext);
  if (!context) return <></>;
  const { getApp, setApp } = context;
  const [getValue, setValue] = useState(rangeData.value);

  // обновляет состояние приложения а касаемо этого элемента и игрока которого компонент получил в пропсах
  useEffect(() => {
    let newContext = { ...context.getApp };
    let player = rangeData.player;
    newContext.buttonList[player][rangeData.type].value = getValue;
    if (rangeData.type == "move_speed") {
      newContext.players[player].speed = parseInt(getValue);
    }

    setApp({
      ...getApp,
      buttonList: newContext.buttonList,
      players: newContext.players,
    });
  }, [getValue]);

  //создание события которое отслеживает текущее значение и обновляет данные в контексте
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setValue(value);
  };

  return (
    <label className="label">
      <span>{rangeData.type}</span>
      <input
        type="range"
        min="1"
        max="5"
        step="1"
        name={rangeData.type}
        id={`${rangeData.player}_${rangeData.type}`}
        value={getValue}
        onChange={onChange}
      />
    </label>
  );
};

// создание и размещение всех range в одном компоненте
export const RangeButtons = () => {
  const context = useContext(GameContext);
  if (!context) return;
  const [buttons] = useState(context.getApp.buttonList);
  type typelist = {
    [key in player]: JSX.Element[];
  };
  const buttonList: typelist = {
    player_1: [],
    player_2: [],
  };

  //создание списка с компонентами и размещение его в  buttonList
  Object.values(buttons).map((_) => {
    Object.values(_).map((rangeData) => {
      buttonList[rangeData.player].push(<RangeInput key={rangeData.id} rangeData={rangeData} />);
    });
  });

  return (
    <div className="range-input-list">
      {Object.entries(buttonList).map(([key, value]) => (
        <div className={key} key={key}>
          {value}
        </div>
      ))}
    </div>
  );
};
