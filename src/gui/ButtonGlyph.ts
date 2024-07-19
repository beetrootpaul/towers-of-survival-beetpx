import {
  $d,
  BpxRgbColor,
  BpxSprite,
  BpxSpriteColorMapping,
  BpxVector2d,
} from "@beetpx/beetpx";
import { g, p8c } from "../globals";

export class ButtonGlyph {
  readonly #glyphSprite: BpxSprite;

  constructor(glyphSprite: BpxSprite) {
    this.#glyphSprite = glyphSprite;
  }

  draw(xy: BpxVector2d, color1: BpxRgbColor, color2: BpxRgbColor): void {
    const prevMapping = $d.setSpriteColorMapping(
      BpxSpriteColorMapping.from([
        [g.buttonTemplateColor1, color1],
        [g.buttonTemplateColor2, color2],
        [p8c.black, null],
      ]),
    );

    $d.sprite(this.#glyphSprite, xy);

    $d.setSpriteColorMapping(prevMapping);
  }
}
