import { Vector2d } from "@beetpx/beetpx";
import { b, g, u } from "../globals";
import { Path } from "../warzone/Path";

export class PathProgression {
  readonly #pathPoints: Vector2d[];

  #pointIndex: number;

  readonly #t0: number;

  constructor(params: { path: Path }) {
    this.#pathPoints = params.path.points;
    this.#pointIndex = 1;
    this.#t0 = b.t;
  }

  currentXy(): Vector2d {
    return (
      this.#pathPoints[this.#pointIndex] ??
      u.throwError(
        `Tried to access non-existent path point at index ${this.#pointIndex}.`
      )
    );
  }

  currentDirection(): "left" | "right" | "up" | "down" {
    const curr = this.#pathPoints[this.#pointIndex];
    const prev =
      this.#pointIndex > 1 ? this.#pathPoints[this.#pointIndex - 1] : curr;
    if (!curr || !prev) return "right";
    if (curr.y > prev.y) return "down";
    if (curr.y < prev.y) return "up";
    if (curr.x < prev.x) return "left";
    return "right";
  }

  hasReachedEnd(): boolean {
    return this.#pointIndex >= this.#pathPoints.length - 1;
  }

  update(): void {
    this.#pointIndex = Math.min(
      Math.floor(1 + (b.t - this.#t0) * g.enemies.speed),
      this.#pathPoints.length - 1
    );
  }
}
