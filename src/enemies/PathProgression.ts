import { Path } from "../warzone/Path";
import { g, u } from "../globals";
import { BpxVector2d } from "beetpx";

export class PathProgression {
  readonly #pathPoints: BpxVector2d[];

  readonly #framesPerPoint: number;
  #counter: number;
  #pointIndex: number;

  constructor(params: { path: Path }) {
    this.#pathPoints = params.path.points;

    this.#framesPerPoint = g.fps / g.enemies.speed;
    this.#counter = 1;
    this.#pointIndex = 1;
  }

  currentXy(): BpxVector2d {
    return (
      this.#pathPoints[this.#pointIndex] ??
      u.throwError(
        `Tried to access non-existent path point at index ${this.#pointIndex}.`
      )
    );
  }

  // TODO: migrate from Lua
  // function s.current_direction()
  //     local curr = path_points[point_index]
  //     local prev = point_index > 1 and path_points[point_index - 1] or curr
  //     if curr.y > prev.y then
  //         return "down"
  //     end
  //     if curr.y < prev.y then
  //         return "up"
  //     end
  //     if curr.x < prev.x then
  //         return "left"
  //     end
  //     return "right"
  // end

  hasReachedEnd(): boolean {
    return this.#pointIndex >= this.#pathPoints.length - 1;
  }

  update(): void {
    if (this.#counter === 0) {
      this.#pointIndex = Math.min(
        this.#pointIndex + 1,
        this.#pathPoints.length - 1
      );
    }
    this.#counter = (this.#counter + 1) % this.#framesPerPoint;
  }
}
