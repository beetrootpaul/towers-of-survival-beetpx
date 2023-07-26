import { v_ } from "beetpx";
import { Pico8Colors } from "./Pico8Color";

export const p8c = Pico8Colors;

export const g = {
  __debug: !__BEETPX_IS_PROD__,

  fps: 60,

  screenSize: v_(64, 64),
  warzoneSizeTiles: v_(12, 12),
  tileSize: v_(4, 4),

  warzoneBorderTiles: 2,

  assets: {
    spritesheet: "spritesheet.png",
  },

  // each value is sprite's xy1 corner on the spritesheet
  sprites: {
    groundTextured: v_(0, 8),
    groundPlain: v_(4, 8),
    road: v_(0, 24),
    roadEdgeBottom: v_(0, 28),
  },
};
