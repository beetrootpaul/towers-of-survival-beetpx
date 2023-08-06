import { BpxSprite, BpxUtils, spr_, v_ } from "beetpx";
import { Pico8Colors } from "./Pico8Color";
import { spro_ } from "./misc/SpriteWithOffset";
import { WaveDescriptor } from "./waves/Wave";

export const p8c = Pico8Colors;

export const u = BpxUtils;

const tileSize = 4;
const warzoneBorderTiles = 2;

export const g = {
  __debug: !__BEETPX_IS_PROD__,

  fps: 60,

  canvasSize: v_(64, 64),
  warzoneSizeTiles: v_(12, 12),
  tileSize: v_(tileSize, tileSize),

  warzoneBorderTiles,
  warzoneBorder: warzoneBorderTiles * tileSize,

  assets: {
    spritesheet: "spritesheet.png",
  },

  buttonSprites: {
    x: {
      raised: spr_(115, 32, 5, 6),
      pressed: spr_(115, 40, 5, 6),
    },
    o: {
      raised: spr_(109, 32, 5, 6),
      pressed: spr_(109, 40, 5, 6),
    },
  },

  buttonTemplateColor1: p8c.greenOld,
  buttonTemplateColor2: p8c.redLight,

  money: {
    // TODO: REVERT
    // initial: 40,
    initial: 200,
    increaseSeconds: 0.5,
  },

  ground: {
    sprites: {
      textured: spr_(0, 8, tileSize, tileSize),
      plain: spr_(4, 8, tileSize, tileSize),
    } as Record<string, BpxSprite>,
  },

  road: {
    sprites: {
      main: spr_(0, 24, tileSize, tileSize),
      bottomEdge: spr_(0, 28, tileSize, tileSize),
    } as Record<string, BpxSprite>,
  },

  cores: [
    {
      y: 4,
      spriteHealthy: spr_(120, 0, 8, 8),
      spriteBroken: spr_(112, 0, 8, 8),
    },
    {
      y: 11,
      spriteHealthy: spr_(120, 8, 8, 8),
      spriteBroken: spr_(112, 8, 8, 8),
    },
    {
      y: 25,
      spriteHealthy: spr_(120, 8, 8, 8),
      spriteBroken: spr_(112, 8, 8, 8),
    },
    {
      y: 32,
      spriteHealthy: spr_(120, 16, 8, 8),
      spriteBroken: spr_(112, 16, 8, 8),
    },
    {
      y: 39,
      spriteHealthy: spr_(120, 24, 8, 8),
      spriteBroken: spr_(112, 24, 8, 8),
    },
  ],

  towers: {
    laser: {
      label: "laser",
      cost: 20,
      sprite: spr_(48, 0, tileSize, tileSize),
      dps: 20,
      chargingTime: 0.9,
      shootingTime: 0.1,
      chargingTimeBoost: -0.1,
      shootingTimeBoost: 0.1,
    },
    booster: {
      label: "booster",
      cost: 30,
      sprite: spr_(48, 8, tileSize, tileSize),
    },
    v_beam: {
      label: "v-beam",
      cost: 70,
      sprite: spr_(48, 16, tileSize, tileSize),
      dps: 40,
      chargingTime: 2,
      shootingTime: 0.5,
      chargingTimeBoost: -0.2,
      shootingTimeBoost: 0.1,
    },
  },

  enemies: {
    // TODO: REVERT
    // speed: 10,
    speed: 10,
    small: {
      hitboxR: 1,
      health: 20,
      spriteRight: spro_(16, 0, 3, 3, 0, 0, 1, 1),
      spriteLeft: spro_(16, 0, 3, 3, 0, 0, 2, 1),
      spriteUp: spro_(20, 0, 2, 4, 1, -1, 2, 1),
      spriteDown: spro_(20, 0, 2, 4, 1, -1, 2, 0),
      spriteDamageRight: spro_(16, 4, 3, 3, 0, 0),
      spriteDamageLeft: spro_(16, 4, 3, 3, 0, 0),
      spriteDamageUp: spro_(20, 4, 2, 4, 1, -1),
      spriteDamageDown: spro_(20, 4, 2, 4, 1, -1),
    },
    medium: {
      hitboxR: 2,
      health: 65,
      spriteRight: spro_(24, 0, 4, 5, 0, -1, 1.5, 0.5),
      spriteLeft: spro_(24, 0, 4, 5, 0, -1, 1.5, 0.5),
      spriteUp: spro_(24, 0, 4, 5, 0, -1, 1.5, 0.5),
      spriteDown: spro_(24, 0, 4, 5, 0, -1, 1.5, 0.5),
      spriteDamageRight: spro_(28, 0, 4, 5, 0, -1),
      spriteDamageLeft: spro_(28, 0, 4, 5, 0, -1),
      spriteDamageUp: spro_(28, 0, 4, 5, 0, -1),
      spriteDamageDown: spro_(28, 0, 4, 5, 0, -1),
    },
    big: {
      hitboxR: 2,
      health: 130,
      spriteRight: spro_(16, 9, 5, 5, -1, -1, 0.5, 0.5),
      spriteLeft: spro_(22, 9, 5, 5, -1, -1, 1.5, 0.5),
      spriteUp: spro_(28, 8, 4, 6, 0, -1, 1.5, 1.5),
      spriteDown: spro_(33, 9, 4, 6, 0, -1, 1.5, 0.5),
      spriteDamageRight: spro_(16, 15, 5, 5, -1, -1),
      spriteDamageLeft: spro_(22, 15, 5, 5, -1, -1),
      spriteDamageUp: spro_(28, 14, 4, 6, 0, -1),
      spriteDamageDown: spro_(33, 15, 4, 6, 0, -1),
    },
  },

  waves: [
    // TODO: REMOVE
    // { wait: 1, spawns: "s" },
    { wait: 1, spawns: "s,s,m,m,b,b" },
    // { wait: 2, spawns: "m,m" },
    // { wait: 3, spawns: "b,b" },
    // TODO: REVERT
    // { wait: 4, spawns: "s,-,-,s,-,-,s" },
    // { wait: 4, spawns: "m,-,-,s,s,s,-,-,m" },
    // { wait: 4, spawns: "s,s,s,-,-,m,m,-,-,-,s,-,-,b" },
    // { wait: 6, spawns: "s,m,b,-,-,-,s,b,-,-,m,m" },
    // { wait: 2, spawns: "m,m,-,-,b,b,b" },
    // { wait: 4, spawns: "s,s,-,m,m,-,b,b" },
    // { wait: 4, spawns: "b,-,s,-,m,-,s,-,b" },
    // { wait: 2, spawns: "m,-,-,-,m,m,m,m,m,m" },
    // { wait: 8, spawns: "s,m,m,b,b,b,-,-,-,-,b,b,b,m,m,s" },
  ] as WaveDescriptor[],
};
