import { $d, $u, $v, $x, BpxSprite, BpxVector2d } from "@beetpx/beetpx";
import { g, p8c } from "../globals";
import { Tile } from "../misc/Tile";
import { Path } from "./Path";

export class Road {
  static readonly #serializedTiles = [
    ["-2|6", "-1|6", "0|6", "1|6"],
    ["1|7"],
    ["1|8"],
    ["1|9", "2|9"],
    ["2|10", "3|10", "4|10", "5|10", "6|10"],
    ["6|9", "7|9", "8|9", "9|9", "10|9"],
    ["10|8"],
    ["10|7", "9|7", "8|7", "7|7"],
    ["7|6"],
    ["7|5", "6|5", "5|5"],
    ["5|6", "4|6", "3|6"],
    ["3|5"],
    ["3|4", "2|4"],
    ["2|3"],
    ["2|2"],
    ["2|1", "3|1", "4|1", "5|1", "6|1", "7|1"],
    ["7|2", "8|2", "9|2"],
    ["9|3", "10|3"],
    ["10|4"],
    ["10|5", "11|5", "12|5", "13|5"],
  ].flatMap(t => t);

  readonly path: Path;

  constructor() {
    const waypoints: BpxVector2d[] = [];
    Road.#serializedTiles.forEach((st, index) => {
      let tileXy = $v(
        parseInt(st.split("|")[0]!, 10),
        parseInt(st.split("|")[1]!, 10),
      );
      if (index === 0) {
        tileXy = tileXy.sub(1, 0);
      } else if (index == Road.#serializedTiles.length - 1) {
        tileXy = tileXy.add(2, 0);
      }
      waypoints.push(tileXy.add(g.warzoneBorderTiles).mul(g.tileSize));
    });

    this.path = new Path({ waypoints });
  }

  isAt(tileToCheck: Tile): boolean {
    return Road.#serializedTiles.some(
      st => st === `${tileToCheck.xy.x}|${tileToCheck.xy.y}`,
    );
  }

  draw(): void {
    const tt: Record<string, boolean> = {};
    Road.#serializedTiles.forEach(st => {
      tt[st] = true;
    });

    for (
      let tileX = -g.warzoneBorderTiles;
      tileX < g.warzoneSizeTiles.x + g.warzoneBorderTiles;
      ++tileX
    ) {
      for (
        let tileY = -g.warzoneBorderTiles;
        tileY < g.warzoneSizeTiles.x + g.warzoneBorderTiles;
        ++tileY
      ) {
        let spriteName: string | null = null;
        if (tt[`${tileX}|${tileY}`]) {
          spriteName = "main";
        } else if (tt[`${tileX}|${tileY - 1}`]) {
          spriteName = "bottomEdge";
        }
        if (spriteName) {
          const sprite: BpxSprite =
            g.road.sprites[spriteName] ??
            $u.throwError(`No "road.sprites.${spriteName}" sprite defined.`);
          $d.sprite(
            sprite,
            $v(tileX, tileY).add(g.warzoneBorderTiles).mul(g.tileSize),
          );
        }
      }
    }

    if ($x.debug) {
      let colorToggle = true;
      for (const point of this.path.points) {
        $d.pixel(point, colorToggle ? p8c.white : p8c.blue);
        colorToggle = !colorToggle;
      }
    }
  }
}
