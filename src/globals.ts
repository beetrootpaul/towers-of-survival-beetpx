import { Sprite, Utils, spr_, v_ } from "@beetpx/beetpx";
import { Pico8Colors } from "./Pico8Color";
import { spro_ } from "./misc/SpriteWithOffset";
import { WaveDescriptor } from "./waves/Wave";

export const p8c = Pico8Colors;

export const u = Utils;

const tileSize = 4;
const warzoneBorderTiles = 2;

const spritesheetUrl = "spritesheet.png";
const s = spr_(spritesheetUrl);
const so = spro_(spritesheetUrl);

export const g = {
  fps: 60,

  canvasSize: v_(64, 64),
  warzoneSizeTiles: v_(12, 12),
  tileSize,

  warzoneBorderTiles,
  warzoneBorder: warzoneBorderTiles * tileSize,

  assets: {
    spritesheet: spritesheetUrl,
    //
    tinyFont: "tiny",
    //
    musicBg1: "sfx00.wav",
    musicBg2: "sfx01.wav",
    musicBg3: "sfx02.wav",
    musicBg4: "sfx03.wav",
    musicMelody1: "sfx04.wav",
    musicMelody2: "sfx05.wav",
    musicMelody3: "sfx06.wav",
    musicMelody4: "sfx07.wav",
    musicMelody5: "sfx08.wav",
    musicMelody6: "sfx09.wav",
    musicMelody7: "sfx10.wav",
    //
    sfxLiveLost: "sfx21.wav",
    sfxCannotPlace: "sfx18.wav",
    sfxTowerPlaced: "sfx19.wav",
    sfxButtonPress: "sfx20.wav",
    sfxVBeam: "sfx17.wav",
    sfxLaser: "sfx16.wav",
  },

  buttonSprites: {
    x: {
      raised: s(115, 32, 5, 6),
      pressed: s(115, 40, 5, 6),
    },
    o: {
      raised: s(109, 32, 5, 6),
      pressed: s(109, 40, 5, 6),
    },
  },

  buttonTemplateColor1: p8c.green,
  buttonTemplateColor2: p8c.red,

  money: {
    // TODO: REVERT
    // initial: 40,
    initial: 200,
    increaseSeconds: 0.5,
  },

  ground: {
    sprites: {
      textured: s(0, 8, tileSize, tileSize),
      plain: s(4, 8, tileSize, tileSize),
    } as Record<string, Sprite>,
  },

  road: {
    sprites: {
      main: s(0, 24, tileSize, tileSize),
      bottomEdge: s(0, 28, tileSize, tileSize),
    } as Record<string, Sprite>,
  },

  cores: [
    {
      y: 4,
      spriteHealthy: s(120, 0, 8, 8),
      spriteBroken: s(112, 0, 8, 8),
    },
    {
      y: 11,
      spriteHealthy: s(120, 8, 8, 8),
      spriteBroken: s(112, 8, 8, 8),
    },
    {
      y: 25,
      spriteHealthy: s(120, 8, 8, 8),
      spriteBroken: s(112, 8, 8, 8),
    },
    {
      y: 32,
      spriteHealthy: s(120, 16, 8, 8),
      spriteBroken: s(112, 16, 8, 8),
    },
    {
      y: 39,
      spriteHealthy: s(120, 24, 8, 8),
      spriteBroken: s(112, 24, 8, 8),
    },
  ],

  towers: {
    laser: {
      label: "laser",
      cost: 20,
      sprite: s(48, 0, tileSize, tileSize),
      dps: 20,
      chargingTime: 0.9,
      shootingTime: 0.1,
      chargingTimeBoost: -0.1,
      shootingTimeBoost: 0.1,
    },
    booster: {
      label: "booster",
      cost: 30,
      sprite: s(48, 8, tileSize, tileSize),
    },
    v_beam: {
      label: "v-beam",
      cost: 70,
      sprite: s(48, 16, tileSize, tileSize),
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
    speed: 30,
    small: {
      hitboxR: 0.5,
      health: 20,
      spriteRight: so(16, 0, 3, 3, 0, 0, 0.5, 0.5),
      spriteLeft: so(16, 0, 3, 3, 0, 0, 1.5, 0.5),
      spriteUp: so(20, 0, 2, 4, 1, -1, 1.5, 0.5),
      spriteDown: so(20, 0, 2, 4, 1, -1, 1.5, -0.5),
      spriteDamageRight: so(16, 4, 3, 3, 0, 0),
      spriteDamageLeft: so(16, 4, 3, 3, 0, 0),
      spriteDamageUp: so(20, 4, 2, 4, 1, -1),
      spriteDamageDown: so(20, 4, 2, 4, 1, -1),
    },
    medium: {
      hitboxR: 1.5,
      health: 65,
      spriteRight: so(24, 0, 4, 5, 0, -1, 1, 0),
      spriteLeft: so(24, 0, 4, 5, 0, -1, 1, 0),
      spriteUp: so(24, 0, 4, 5, 0, -1, 1, 0),
      spriteDown: so(24, 0, 4, 5, 0, -1, 1, 0),
      spriteDamageRight: so(28, 0, 4, 5, 0, -1),
      spriteDamageLeft: so(28, 0, 4, 5, 0, -1),
      spriteDamageUp: so(28, 0, 4, 5, 0, -1),
      spriteDamageDown: so(28, 0, 4, 5, 0, -1),
    },
    big: {
      hitboxR: 1.5,
      health: 130,
      spriteRight: so(16, 9, 5, 5, -1, -1, 0, 0),
      spriteLeft: so(22, 9, 5, 5, -1, -1, 1, 0),
      spriteUp: so(28, 8, 4, 6, 0, -1, 1, 1),
      spriteDown: so(33, 9, 4, 6, 0, -1, 1, 0),
      spriteDamageRight: so(16, 15, 5, 5, -1, -1),
      spriteDamageLeft: so(22, 15, 5, 5, -1, -1),
      spriteDamageUp: so(28, 14, 4, 6, 0, -1),
      spriteDamageDown: so(33, 15, 4, 6, 0, -1),
    },
  },

  waves: [
    // TODO: REMOVE
    // { wait: 1, spawns: "s,m,b,s,m,b,s,m,b" },
    { wait: 1, spawns: "s" },
    { wait: 1, spawns: "m,m" },
    { wait: 1, spawns: "-,-,b,-,-" },
    // { wait: 1, spawns: "-,-,s,s,-,-" },
    // { wait: 1, spawns: "-,-,-,m,m,m,-,-,-" },
    // { wait: 1, spawns: "-,-,-,-,g,g,g,g,-,-,-,-" },
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
