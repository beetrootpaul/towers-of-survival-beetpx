import { BpxSprite, BpxUtils, spr_, v_ } from "beetpx";
import { Pico8Colors } from "./Pico8Color";

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

  enemies: {
    // TODO: REVERT
    // speed: 10,
    speed: 60,
    small: {
      // TODO: migrate from Lua
      //             hitbox_r = 1,
      //             health = 20,
      //             -- format: {x, y, w, h, offset_x, offset_y, hitbox_offset_x, hitbox_offset_y }
      spriteRight: spr_(16, 0, 3, 3),
      //             sprite_right = { 16, 0, 3, 3, 0, 0, 1, 1 },
      //             sprite_left = { 16, 0, 3, 3, 0, 0, 1, 1 },
      //             sprite_up = { 20, 0, 2, 4, 1, -1, 1, 0 },
      //             sprite_down = { 20, 0, 2, 4, 1, -1, 1, 0 },
      //             -- format: {x, y, w, h, offset_x, offset_y }
      //             sprite_damage_right = { 16, 4, 3, 3, 0, 0 },
      //             sprite_damage_left = { 16, 4, 3, 3, 0, 0 },
      //             sprite_damage_up = { 20, 4, 2, 4, 1, -1 },
      //             sprite_damage_down = { 20, 4, 2, 4, 1, -1 },
    },
    medium: {
      // TODO: migrate from Lua
      //             hitbox_r = 1.5,
      //             health = 65,
      //             -- format: {x, y, w, h, offset_x, offset_y, hitbox_offset_x, hitbox_offset_y }
      spriteRight: spr_(24, 0, 4, 5),
      //             sprite_right = { 24, 0, 4, 5, 0, -1, 1.5, .5 },
      //             sprite_left = { 24, 0, 4, 5, 0, -1, 1.5, .5 },
      //             sprite_up = { 24, 0, 4, 5, 0, -1, 1.5, .5 },
      //             sprite_down = { 24, 0, 4, 5, 0, -1, 1.5, .5 },
      //             -- format: {x, y, w, h, offset_x, offset_y }
      //             sprite_damage_right = { 28, 0, 4, 5, 0, -1 },
      //             sprite_damage_left = { 28, 0, 4, 5, 0, -1 },
      //             sprite_damage_up = { 28, 0, 4, 5, 0, -1 },
      //             sprite_damage_down = { 28, 0, 4, 5, 0, -1 },
    },
    big: {
      // TODO: migrate from Lua
      //             hitbox_r = 2,
      //             health = 130,
      //             -- format: {x, y, w, h, offset_x, offset_y, hitbox_offset_x, hitbox_offset_y }
      spriteRight: spr_(16, 9, 5, 5),
      //             sprite_right = { 16, 9, 5, 5, -1, -1, 1.5, .5 },
      //             sprite_left = { 22, 9, 5, 5, -1, -1, 1.5, .5 },
      //             sprite_up = { 28, 8, 4, 6, 0, -1, 1.5, 1.5 },
      //             sprite_down = { 33, 9, 4, 6, 0, -1, 1.5, .5 },
      //             -- format: {x, y, w, h, offset_x, offset_y }
      //             sprite_damage_right = { 16, 15, 5, 5, -1, -1 },
      //             sprite_damage_left = { 22, 15, 5, 5, -1, -1 },
      //             sprite_damage_up = { 28, 14, 4, 6, 0, -1 },
      //             sprite_damage_down = { 33, 15, 4, 6, 0, -1 },
    },
  },
};
