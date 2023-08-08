import { BeetPx, BpxVector2d, v_ } from "@beetpx/beetpx";
import { g, p8c } from "../globals";

export class Fight {
  readonly #lasers: Array<{ xy1: BpxVector2d; xy2: BpxVector2d }> = [];
  readonly #beams: Array<{ tileX: number }> = [];

  showLaser(laser: { xy1: BpxVector2d; xy2: BpxVector2d }): void {
    this.#lasers.push(laser);
  }

  showBeam(beam: { tileX: number }): void {
    this.#beams.push(beam);
  }

  update(): void {
    this.#lasers.splice(0, this.#lasers.length);
    this.#beams.splice(0, this.#beams.length);
  }

  draw(): void {
    for (const laser of this.#lasers) {
      // TODO: this is ridiculous! Let's change line's API to have right-bottom corner INCLUSIVE
      const xy1 = laser.xy1.add(
        laser.xy1.x < laser.xy2.x ? 0 : 1,
        laser.xy1.y < laser.xy2.y ? 0 : 1
      );
      const xy2 = laser.xy2.add(
        laser.xy1.x < laser.xy2.x ? 1 : 0,
        laser.xy1.y < laser.xy2.y ? 1 : 0
      );
      BeetPx.line(xy1, xy2, p8c.white);
    }

    for (const beam of this.#beams) {
      const x = (g.warzoneBorderTiles + beam.tileX) * g.tileSize.x + 1;
      for (let offset = 0; offset < 2; offset++) {
        BeetPx.line(
          v_(x + offset, g.warzoneBorder),
          v_(x + offset + 1, g.canvasSize.y - g.warzoneBorder),
          p8c.white
        );
      }
    }
  }
}
