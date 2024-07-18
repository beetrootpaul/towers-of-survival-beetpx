import { BpxGlyph, font_, spr_ } from "@beetpx/beetpx";
import { g, p8c } from "./globals";

export const tinyFont = font_({
  ascent: 4,
  descent: 0,
  lineGap: 1,

  mapChar: (char: string): string => char.toLowerCase(),

  glyphs: new Map<string, BpxGlyph>([
    //
    [" ", gl(126, 32, 2)],
    //
    ["-", gl(100, 32, 2)],
    [".", gl(103, 32, 1)],
    [":", gl(66, 32, 1)],
    //
    ["$", gl(105, 32)], // currency symbol
    ["<", gl(121, 32, 4, 5)], // back arrow
    ["*", gl(39, 40, 5)], // star
    ["@", gl(45, 40, 5)], // skull
    //
    ["1", gl(0, 40, 2)],
    ["2", gl(3, 40)],
    ["3", gl(7, 40)],
    ["4", gl(11, 40)],
    ["5", gl(15, 40)],
    ["6", gl(19, 40)],
    ["7", gl(23, 40)],
    ["8", gl(27, 40)],
    ["9", gl(31, 40)],
    ["0", gl(35, 40)],
    //
    ["a", gl(0, 32)],
    ["b", gl(4, 32)],
    ["c", gl(8, 32)],
    ["d", gl(12, 32)],
    ["e", gl(16, 32)],
    ["f", gl(20, 32)],
    ["g", gl(24, 32)],
    ["h", gl(28, 32)],
    ["i", gl(32, 32, 1)],
    ["j", gl(34, 32, 2)],
    ["k", gl(37, 32)],
    ["l", gl(41, 32, 2)],
    ["m", gl(44, 32)],
    ["n", gl(48, 32)],
    ["o", gl(52, 32)],
    ["p", gl(56, 32)],
    ["q", gl(60, 32)],
    ["r", gl(64, 32)],
    ["s", gl(68, 32)],
    ["t", gl(72, 32)],
    ["u", gl(76, 32)],
    ["v", gl(80, 32)],
    ["w", gl(84, 32)],
    ["x", gl(88, 32)],
    ["y", gl(92, 32)],
    ["z", gl(96, 32)],
    //
  ]),
});

function gl(x: number, y: number, w: number = 3, h: number = 4): BpxGlyph {
  return {
    type: "sprite",
    sprite: spr_(g.assets.spritesheet)(w, h, x, y),
    isTextColor: spriteSheetColor =>
      spriteSheetColor?.cssHex === p8c.green.cssHex,
    advance: w + 1,
  };
}
