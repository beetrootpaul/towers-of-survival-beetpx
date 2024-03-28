import { BpxVector2d } from "@beetpx/beetpx";

export class Tile {
  readonly #xy: BpxVector2d;

  constructor(xy: BpxVector2d) {
    this.#xy = xy;
  }

  get xy(): BpxVector2d {
    return this.#xy;
  }

  plus(dXy: BpxVector2d): Tile {
    return new Tile(this.#xy.add(dXy));
  }

  isSameAs(anotherTile: Tile): boolean {
    return this.xy.eq(anotherTile.xy);
  }
}
