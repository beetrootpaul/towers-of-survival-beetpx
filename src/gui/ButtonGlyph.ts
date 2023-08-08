import { BeetPx, BpxSprite, BpxVector2d } from "@beetpx/beetpx";
import { SolidColor } from "@beetpx/beetpx/ts_output/Color";
import { g } from "../globals";

export class ButtonGlyph {
  // TODO: make framework types named same as exported ones, since IDE suggestions and completions often use the non-prefixed ones
  readonly #glyphSprite: BpxSprite;

  constructor(glyphSprite: BpxSprite) {
    this.#glyphSprite = glyphSprite;
  }

  draw(xy: BpxVector2d, color1: SolidColor, color2: SolidColor): void {
    // TODO: how to make it shorter?
    const [prevColor1, prevColor2] = [
      BeetPx.getMappedSpriteColor(g.buttonTemplateColor1),
      BeetPx.getMappedSpriteColor(g.buttonTemplateColor2),
    ];
    BeetPx.mapSpriteColors([
      { from: g.buttonTemplateColor1, to: color1 },
      { from: g.buttonTemplateColor2, to: color2 },
    ]);

    // TODO: get rid of a need to defined the image URL for the sprite
    BeetPx.sprite(g.assets.spritesheet, this.#glyphSprite, xy);

    BeetPx.mapSpriteColors([
      { from: g.buttonTemplateColor1, to: prevColor1 },
      { from: g.buttonTemplateColor2, to: prevColor2 },
    ]);
  }
}
