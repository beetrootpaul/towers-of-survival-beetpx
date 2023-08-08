import { BeetPx, BpxSprite, BpxVector2d, v_ } from "@beetpx/beetpx";
import { g, u } from "../globals";
import { Tile } from "../misc/Tile";

export class Ground {
  static readonly #plainOffsets = [
    v_(0, 0),
    v_(-1, -1),
    v_(0, -1),
    v_(1, -1),
    v_(1, 0),
    v_(1, 1),
    v_(0, 1),
    v_(-1, 1),
    v_(-1, 0),
  ];

  readonly #sprites: Record<string, BpxSprite>;

  constructor() {
    this.#sprites = {};
    BpxVector2d.forEachIntXyWithinRectOf(
      BpxVector2d.zero,
      g.warzoneSizeTiles,
      true,
      (xy) => {
        this.#sprites[`${xy.x}|${xy.y}`] =
          g.ground.sprites.textured ??
          u.throwError(`No "ground.sprites.textured" sprite defined.`);
      }
    );
  }

  isAt(tile: Tile): boolean {
    return (
      tile.xy.gte(BpxVector2d.zero) && tile.xy.lte(g.warzoneSizeTiles.sub(1))
    );
  }

  makePlainAtAndAround(tile: Tile): void {
    for (const offset of Ground.#plainOffsets) {
      const t = tile.plus(offset);
      if (this.#sprites[`${t.xy.x}|${t.xy.y}`]) {
        this.#sprites[`${t.xy.x}|${t.xy.y}`] =
          g.ground.sprites.plain ??
          u.throwError(`No "ground.sprites.plain" sprite defined.`);
      }
    }
  }

  draw(): void {
    BpxVector2d.forEachIntXyWithinRectOf(
      BpxVector2d.zero,
      g.warzoneSizeTiles,
      true,
      (tileXy) => {
        const sprite = this.#sprites[`${tileXy.x}|${tileXy.y}`];
        if (sprite) {
          BeetPx.sprite(
            g.assets.spritesheet,
            sprite,
            tileXy.add(g.warzoneBorderTiles).mul(g.tileSize)
          );
        }
      }
    );
  }
}
