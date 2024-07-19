import { $d, $v, BpxVector2d } from "@beetpx/beetpx";
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
      const xy = laser.xy1;
      const wh = laser.xy2.sub(laser.xy1);
      $d.line(xy, wh.add(wh.sign()), p8c.limeGreen);
    }

    for (const beam of this.#beams) {
      const x = (g.warzoneBorderTiles + beam.tileX) * g.tileSize + 1;
      for (let offset = 0; offset < 2; offset++) {
        $d.line(
          $v(x + offset, g.warzoneBorder),
          $v(1, g.canvasSize.y - 2 * g.warzoneBorder),
          p8c.white,
        );
      }
    }
  }
}
