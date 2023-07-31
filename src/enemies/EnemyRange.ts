import { BeetPx, BpxSolidColor, BpxVector2d } from "beetpx";

export class EnemyRange {
  readonly #center: BpxVector2d;
  readonly #r: number;

  constructor(center: BpxVector2d, r: number) {
    this.#center = center;
    this.#r = r;
  }

  // TODO: migrate from Lua
  //     return {
  //         circle = function()
  //             return { xy = xy, r = r }
  //         end,
  //     }

  draw(color: BpxSolidColor): void {
    // TODO: migrate from Lua
    //             clip(0, a.wb, u.vs, u.vs - a.wb)
    BeetPx.ellipse(this.#center.sub(this.#r), this.#center.add(this.#r), color);
    // TODO: migrate from Lua
    //             clip()
  }
}
