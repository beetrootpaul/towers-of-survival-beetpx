import { Path } from "../warzone/Path";
import { Vector2d } from "beetpx/ts_output/Vector2d";
import { g, u } from "../globals";

export class PathProgression {
  private readonly pathPoints: Vector2d[];

  private readonly framesPerPoint: number;
  private counter: number;
  private pointIndex: number;

  constructor(params: { path: Path }) {
    this.pathPoints = params.path.points;

    this.framesPerPoint = g.fps / g.enemies.speed;
    this.counter = 1;
    this.pointIndex = 1;
  }

  currentXy(): Vector2d {
    return (
      this.pathPoints[this.pointIndex] ??
      u.throwError(
        `Tried to access non-existent path point at index ${this.pointIndex}.`
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
    return this.pointIndex >= this.pathPoints.length - 1;
  }

  update(): void {
    if (this.counter === 0) {
      this.pointIndex = Math.min(
        this.pointIndex + 1,
        this.pathPoints.length - 1
      );
    }
    this.counter = (this.counter + 1) % this.framesPerPoint;
  }
}
