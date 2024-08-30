import { useContext } from "react";
import { GameContext } from "./GameProvider";
import { color } from "../types/types";
import { changeColor } from "../models/helpers";

export function ColorMenu() {
  const context = useContext(GameContext);
  if (!context) return <></>;
  const { getApp, setApp } = context;
  const { posX, posY, isActive } = getApp.colorMenu;
  const spellColors: color[] = [
    "white",
    "black",
    "yellow",
    "purple",
    "coral",
    "crimson",
    "darkgoldenrod",
    "darkslateblue",
    "aqua",
    "blue",
    "brown",
    "cadetblue",
    "greenyellow",
    "mediumslateblue",
    "teal",
  ];

  // сохраняет выбраный цвет в контекст
  const handleColorChange = (event: React.MouseEvent) => {
    const contextMenu = { ...getApp.colorMenu };
    const color = event.currentTarget.getAttribute("data-value") as color;
    contextMenu.isActive = false;
    changeColor({ getApp, setApp }, color);
    setApp({ ...getApp, colorMenu: contextMenu });
    event.stopPropagation();
  };

  return (
    <div className={`color-menu ${isActive ? "" : "hiden"}`} style={{ left: posX, top: posY }}>
      <h3 className="color-menu-header">{}</h3>
      <div className="spell-container">
        {spellColors.map((color, index) => (
          <div
            onClick={handleColorChange}
            data-value={color}
            className={`${color} color`}
            key={index}
            style={{ width: "20px", height: "20px", backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
}
