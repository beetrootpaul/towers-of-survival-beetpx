import { BeetPx, SolidColor, Sprite, Vector2d } from "@beetpx/beetpx";
import { g } from "../globals";

export class ButtonGlyph {
  readonly #glyphSprite: Sprite;

  constructor(glyphSprite: Sprite) {
    this.#glyphSprite = glyphSprite;
  }

  draw(xy: Vector2d, color1: SolidColor, color2: SolidColor): void {
    // TODO: how to make it shorter?
    const [prevColor1, prevColor2] = [
      BeetPx.getMappedSpriteColor(g.buttonTemplateColor1),
      BeetPx.getMappedSpriteColor(g.buttonTemplateColor2),
    ];
    BeetPx.mapSpriteColors([
      { from: g.buttonTemplateColor1, to: color1 },
      { from: g.buttonTemplateColor2, to: color2 },
    ]);

    // TODO: get rid of a need to define the image URL for the sprite
    BeetPx.sprite(g.assets.spritesheet, this.#glyphSprite, xy);

    BeetPx.mapSpriteColors([
      { from: g.buttonTemplateColor1, to: prevColor1 },
      { from: g.buttonTemplateColor2, to: prevColor2 },
    ]);
  }
}
