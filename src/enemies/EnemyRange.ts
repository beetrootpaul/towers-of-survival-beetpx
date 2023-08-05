import { BeetPx, BpxSolidColor, BpxVector2d } from "beetpx";

export class EnemyRange {
  readonly #center: BpxVector2d;
  readonly #r: number;

  constructor(center: BpxVector2d, r: number) {
    this.#center = center;
    this.#r = r;
  }

  get circle(): { center: BpxVector2d; r: number } {
    return {
      center: this.#center,
      r: this.#r,
    };
  }

  draw(color: BpxSolidColor): void {
    // TODO: migrate from Lua
    //             clip(0, a.wb, u.vs, u.vs - a.wb)
    BeetPx.ellipse(this.#center.sub(this.#r), this.#center.add(this.#r), color);
    // TODO: migrate from Lua
    //             clip()
  }
}
