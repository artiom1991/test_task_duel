import { GameData, PlayerData, GameProviderData, player, Players, color, ProjectileData, Projectiles } from "../types/types";
import { Projectile } from "./Projectile";

// сдесь собраны все вспомогающие функции которые могут использоваться в более чем одном компоненте или методе приложения

export const drawScene = (getApp: GameData, ctx: CanvasRenderingContext2D) => {
  const { players, projectiles, field } = getApp;
  ctx.clearRect(0, 0, field.width, field.height);

  Object.values(players).map((player) => {
    drawPlayer(getApp.players[player.name], ctx);
  });

  Object.values(projectiles).map((projectile_list) => {
    projectile_list.map((projectile) => {
      drawProjectile(projectile, ctx);
    });
  });
};

export const drawPlayer = (player: PlayerData, ctx: CanvasRenderingContext2D) => {
  const playerColors = { player_1: "red", player_2: "blue" };
  const { posX, posY, radius } = player;

  ctx.beginPath();
  ctx.fillStyle = playerColors[player.name];
  ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
  ctx.fill();
};

export const movePlayers = ({ getApp, setApp }: GameProviderData) => {
  const players: Players = { ...getApp.players };
  Object.values(players).map((player) => {
    player.posY += player.moveDirection === "up" ? -player.speed : player.speed;
    if (player.posY <= 75 || player.posY >= 400 - 75) {
      player.moveDirection = player.moveDirection === "up" ? "down" : "up";
    }
  });
  setApp({ ...getApp, players: players });
};

export const moveProjectiles = ({ getApp, setApp }: GameProviderData) => {
  const projectiles: Projectiles = { ...getApp.projectiles };
  Object.values(projectiles).map((emiter) => {
    emiter.map((projectile) => {
      projectile.posX += projectile.emiter === "player_1" ? projectile.speed : -projectile.speed;
    });
  });
  setApp({ ...getApp, projectiles: projectiles });
};

export const spawnProjectile = (getApp: GameData) => {
  const players: player[] = ["player_1", "player_2"];
  const values = players.reduce((res, player) => {
    res[player] = {
      posX: getApp.players[player].posX,
      posY: getApp.players[player].posY,
      speed: parseInt(getApp.buttonList[player]["projectile_speed"].value),
      color: getApp.colorMenu.projectilesColor[player],
      emiter: getApp.players[player].name,
      target: getApp.players[player].name === "player_1" ? "player_2" : "player_1",
    };
    return res;
  }, {} as Record<string, { speed: number; posY: number; posX: number; color: string; emiter: player; target: player }>);

  Object.values(values).map((player) => {
    getApp.projectiles[player.emiter].push(new Projectile(50, player.posX, player.posY, player.speed, player.color, player.emiter, player.target));
  });
};

export const detectCollision = ({ getApp, setApp }: GameProviderData) => {
  const { projectiles, players, score } = getApp;
  const entries = Object.entries(projectiles) as [player, ProjectileData[]][];
  const updatedProjectiles = entries.reduce((res, [playerId, projectileArray]) => {
    const filteredProjectiles = projectileArray.filter((projectile) => {
      const { posX, posY, emiter } = projectile;
      const target = players[projectile.target];
      if (posX >= target.posX - 75 && posX <= target.posX + 75 && posY >= target.posY - 75 && posY <= target.posY + 75) {
        score[emiter] += 1;
        return false;
      } else if (posX < 0 || posX > 800) {
        return false;
      }
      return true;
    });

    res[playerId] = filteredProjectiles;
    return res;
  }, {} as Projectiles);
  setApp({ ...getApp, projectiles: updatedProjectiles, score: { ...score } });
};

export const detectCursore = ({ getApp, setApp }: GameProviderData) => {
  const { clientX, clientY } = getApp.cursorPosition;
  const updatePlayers = { ...getApp.players };

  Object.values(updatePlayers).forEach((player) => {
    const { posX, posY, moveDirection } = player;
    if (clientX >= posX - 75 && clientX <= posX + 75 && clientY >= posY - 75 && clientY <= posY + 75) {
      player.moveDirection = moveDirection === "up" ? "down" : "up";
    }
  });
  setApp({ ...getApp, players: updatePlayers });
};

export const drawProjectile = (projectile: Projectile, ctx: CanvasRenderingContext2D) => {
  const { posX, posY, color } = projectile;
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
  ctx.fill();
};

export const changeColor = ({ getApp, setApp }: GameProviderData, color: color) => {
  const colorMenu = { ...getApp.colorMenu };
  colorMenu.projectilesColor[colorMenu.player] = color;
  setApp({ ...getApp, colorMenu: colorMenu });
};
