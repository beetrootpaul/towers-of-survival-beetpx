import { BpxSprite } from "beetpx";
import { Vector2d } from "beetpx/ts_output/Vector2d";
import { g } from "../globals";

export class TileSprite extends BpxSprite {
  constructor(spriteXy1: Vector2d) {
    super(spriteXy1, spriteXy1.add(g.tileSize));
  }
}
