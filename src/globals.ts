import { BpxSprite, spr_, v_ } from "beetpx";
import { Pico8Colors } from "./Pico8Color";

export const p8c = Pico8Colors;

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

  // each value is sprite's xy1 corner on the spritesheet
  sprites: {
    groundTextured: spr_(0, 8, tileSize, tileSize),
    groundPlain: spr_(4, 8, tileSize, tileSize),

    road: spr_(0, 24, tileSize, tileSize),
    roadEdgeBottom: spr_(0, 28, tileSize, tileSize),

    coreHealthy1: spr_(120, 0, 8, 8),
    coreHealthy2: spr_(120, 8, 8, 8),
    coreHealthy3: spr_(120, 8, 8, 8),
    coreHealthy4: spr_(120, 16, 8, 8),
    coreHealthy5: spr_(120, 24, 8, 8),
    coreBroken1: spr_(112, 0, 8, 8),
    coreBroken2: spr_(112, 8, 8, 8),
    coreBroken3: spr_(112, 8, 8, 8),
    coreBroken4: spr_(112, 16, 8, 8),
    coreBroken5: spr_(112, 24, 8, 8),
  } as Record<string, BpxSprite>,
};
