import { Vector2d } from "@beetpx/beetpx";

export class Tile {
  readonly #xy: Vector2d;

  constructor(xy: Vector2d) {
    this.#xy = xy;
  }

  get xy(): Vector2d {
    return this.#xy;
  }

  plus(dXy: Vector2d): Tile {
    return new Tile(this.#xy.add(dXy));
  }

  isSameAs(anotherTile: Tile): boolean {
    return this.xy.eq(anotherTile.xy);
  }
}
