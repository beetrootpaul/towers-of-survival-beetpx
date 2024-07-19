import { $u, BpxVector2d } from "@beetpx/beetpx";
import { g } from "../globals";
import { Path } from "../warzone/Path";

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
      $u.throwError(
        `Tried to access non-existent path point at index ${this.#pointIndex}.`,
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
    if (this.#counter === 0) {
      this.#pointIndex = Math.min(
        this.#pointIndex + 1,
        this.#pathPoints.length - 1,
      );
    }
    this.#counter = (this.#counter + 1) % this.#framesPerPoint;
  }
}
