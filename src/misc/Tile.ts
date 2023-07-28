import { BpxVector2d } from "beetpx";

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

  // TODO: migrate from Lua
  // return {
  //     is_same_as = function(another_tile)
  //         return x == another_tile.x and y == another_tile.y
  //     end
  // }
}
