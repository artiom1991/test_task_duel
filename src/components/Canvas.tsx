import { useContext, useRef, useEffect } from "react";
import { GameContext } from "./GameProvider";
import { movePlayers, moveProjectiles, detectCollision, drawScene, spawnProjectile, detectCursore } from "../models/helpers";
import { CursorPosition } from "../types/types";

export const Canvas = (): JSX.Element => {
  const context = useContext(GameContext);
  if (!context) return <></>;
  const { getApp, setApp } = context;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const getAppRef = useRef(getApp);
  getAppRef.current = getApp;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    //отрисовка кадра
    const frame = () => {
      movePlayers({ getApp, setApp });
      moveProjectiles({ getApp, setApp });
      drawScene(getApp, ctx);
      detectCursore({ getApp, setApp });
      detectCollision({ getApp, setApp });
      frameId = requestAnimationFrame(frame);
    };

    //создание ссылки на отрисовку кадра
    let frameId = requestAnimationFrame(frame);

    // удаление отрисовки кадра чтобы не забивать память и процессор
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [getApp, setApp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //создание снарядов
      spawnProjectile(getAppRef.current);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  //отслеживает положение курсора в вюьпорте, высчитывает положение относительно canvas
  // и сохраняет в контекст
  const handleMouseMove = ({ clientX, clientY }: CursorPosition) => {
    if (!canvasRef.current) {
      return;
    }
    const rect = canvasRef.current.getBoundingClientRect();
    const cursorPosition: CursorPosition = {
      clientX: clientX - rect.left,
      clientY: clientY - rect.top,
    };
    setApp({ ...getApp, cursorPosition: cursorPosition });
  };

  //обнуляет координаты в контексте если курсор вышел за пределы canvas
  const handleMouseLeave = () => {
    const cursorPosition: CursorPosition = {
      clientX: 0,
      clientY: 0,
    };
    setApp({ ...getApp, cursorPosition: cursorPosition });
  };

  //отслеживает клики в canvas и определяет был ли клик по игроку
  // если клик был то определяет по какому игроку и отрисовывает меню выбора цвета
  const handleClick = (event: React.MouseEvent) => {
    if (!canvasRef.current) {
      return;
    }
    event.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const { clientX, clientY }: CursorPosition = { clientX: event.clientX - rect.left, clientY: event.clientY - rect.top };
    const colorMenu = { ...getApp.colorMenu };
    const players = { ...getApp.players };

    Object.values(players).forEach((player) => {
      const { posX, posY, name } = player;
      if (clientX >= posX - 75 && clientX <= posX + 75 && clientY >= posY - 75 && clientY <= posY + 75) {
        colorMenu.isActive = true;
        colorMenu.player = name;
        colorMenu.posX = clientX;
        colorMenu.posY = clientY;
      }
    });

    setApp({ ...getApp, colorMenu: colorMenu });
  };

  return (
    <canvas
      width={800}
      height={400}
      ref={canvasRef}
      style={{ background: "green" }}
      className="canvas"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    ></canvas>
  );
};
