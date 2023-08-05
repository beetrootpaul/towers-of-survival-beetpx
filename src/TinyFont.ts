import {
  BpxCharSprite,
  BpxSprite,
  BpxVector2d,
  spr_,
  v_,
  type BpxFont,
} from "beetpx";

function c_(x1: number, y1: number, w: number = 3, h: number = 4): BpxSprite {
  return spr_(x1, y1, w, h);
}

export class TinyFont implements BpxFont {
  static #sprites: Record<string, BpxSprite> = {
    [" "]: c_(126, 32, 2), // space
    //
    ["1"]: c_(0, 40, 2),
    ["2"]: c_(3, 40),
    ["3"]: c_(7, 40),
    ["4"]: c_(11, 40),
    ["5"]: c_(15, 40),
    ["6"]: c_(19, 40),
    ["7"]: c_(23, 40),
    ["8"]: c_(27, 40),
    ["9"]: c_(31, 40),
    ["0"]: c_(35, 40),
    //
    ["a"]: c_(0, 32),
    ["b"]: c_(4, 32),
    ["c"]: c_(8, 32),
    ["d"]: c_(12, 32),
    ["e"]: c_(16, 32),
    ["f"]: c_(20, 32),
    ["g"]: c_(24, 32),
    ["h"]: c_(28, 32),
    ["i"]: c_(32, 32, 1),
    ["j"]: c_(34, 32, 2),
    ["k"]: c_(37, 32),
    ["l"]: c_(41, 32, 2),
    ["m"]: c_(44, 32),
    ["n"]: c_(48, 32),
    ["o"]: c_(52, 32),
    ["p"]: c_(56, 32),
    ["q"]: c_(60, 32),
    ["r"]: c_(64, 32),
    ["s"]: c_(68, 32),
    ["t"]: c_(72, 32),
    ["u"]: c_(76, 32),
    ["v"]: c_(80, 32),
    ["w"]: c_(84, 32),
    ["x"]: c_(88, 32),
    ["y"]: c_(92, 32),
    ["z"]: c_(96, 32),
    //
    ["-"]: c_(100, 32, 2),
    ["."]: c_(103, 32, 1),
    [":"]: c_(66, 32, 1),
    //
    ["$"]: c_(105, 32), // currency symbol
    ["<"]: c_(121, 32, 4, 5), // back arrow
    ["*"]: c_(39, 40, 5), // star
    ["@"]: c_(45, 40, 5), // skull
  };

  spritesFor(text: string): BpxCharSprite[] {
    const charSprites: BpxCharSprite[] = [];
    let positionInText: BpxVector2d = BpxVector2d.zero;

    for (let i = 0; i < text.length; i += 1) {
      let char = text[i]!.toLowerCase();
      let sprite = TinyFont.#sprites[char] ?? null;
      if (sprite) {
        charSprites.push({ positionInText, sprite, char });
      }
      const jumpX = (sprite ?? c_(-1, -1)).size().x + 1;
      positionInText = positionInText.add(v_(jumpX, 0));
    }

    return charSprites;
  }
}
