import { BpxFont, BpxGlyph, BpxRgbColor, spr_ } from "@beetpx/beetpx";
import { g, p8c } from "./globals";

export class TinyFont extends BpxFont {
  readonly spriteSheetUrls = [g.assets.spritesheet];

  isSpriteSheetTextColor(color: BpxRgbColor | null): boolean {
    return color?.cssHex === p8c.green.cssHex;
  }

  readonly ascent = 4;
  readonly descent = 0;
  readonly lineGap = 1;

  protected mapChar(char: string): string {
    return char.toLowerCase();
  }

  readonly glyphs = new Map<string, BpxGlyph>([
    //
    [" ", this.#g(126, 32, 2)],
    //
    ["-", this.#g(100, 32, 2)],
    [".", this.#g(103, 32, 1)],
    [":", this.#g(66, 32, 1)],
    //
    ["$", this.#g(105, 32)], // currency symbol
    ["<", this.#g(121, 32, 4, 5)], // back arrow
    ["*", this.#g(39, 40, 5)], // star
    ["@", this.#g(45, 40, 5)], // skull
    //
    ["1", this.#g(0, 40, 2)],
    ["2", this.#g(3, 40)],
    ["3", this.#g(7, 40)],
    ["4", this.#g(11, 40)],
    ["5", this.#g(15, 40)],
    ["6", this.#g(19, 40)],
    ["7", this.#g(23, 40)],
    ["8", this.#g(27, 40)],
    ["9", this.#g(31, 40)],
    ["0", this.#g(35, 40)],
    //
    ["a", this.#g(0, 32)],
    ["b", this.#g(4, 32)],
    ["c", this.#g(8, 32)],
    ["d", this.#g(12, 32)],
    ["e", this.#g(16, 32)],
    ["f", this.#g(20, 32)],
    ["g", this.#g(24, 32)],
    ["h", this.#g(28, 32)],
    ["i", this.#g(32, 32, 1)],
    ["j", this.#g(34, 32, 2)],
    ["k", this.#g(37, 32)],
    ["l", this.#g(41, 32, 2)],
    ["m", this.#g(44, 32)],
    ["n", this.#g(48, 32)],
    ["o", this.#g(52, 32)],
    ["p", this.#g(56, 32)],
    ["q", this.#g(60, 32)],
    ["r", this.#g(64, 32)],
    ["s", this.#g(68, 32)],
    ["t", this.#g(72, 32)],
    ["u", this.#g(76, 32)],
    ["v", this.#g(80, 32)],
    ["w", this.#g(84, 32)],
    ["x", this.#g(88, 32)],
    ["y", this.#g(92, 32)],
    ["z", this.#g(96, 32)],
    //
  ]);

  #g(x: number, y: number, w: number = 3, h: number = 4): BpxGlyph {
    return {
      type: "sprite",
      sprite: spr_(g.assets.spritesheet)(w, h, x, y),
      advance: w + 1,
    };
  }
}
