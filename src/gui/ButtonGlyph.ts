import { SolidColor, Sprite, Vector2d } from "@beetpx/beetpx";
import { b, g } from "../globals";

export class ButtonGlyph {
  readonly #glyphSprite: Sprite;

  constructor(glyphSprite: Sprite) {
    this.#glyphSprite = glyphSprite;
  }

  draw(xy: Vector2d, color1: SolidColor, color2: SolidColor): void {
    const prevMapping = b.mapSpriteColors([
      { from: g.buttonTemplateColor1, to: color1 },
      { from: g.buttonTemplateColor2, to: color2 },
    ]);

    b.sprite(this.#glyphSprite, xy);

    b.mapSpriteColors(prevMapping);
  }
}
