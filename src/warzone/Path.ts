import { $v, BpxVector2d } from "@beetpx/beetpx";

export class Path {
  readonly points: BpxVector2d[] = [];

  constructor(params: { waypoints: BpxVector2d[] }) {
    let next: BpxVector2d;
    let prev: BpxVector2d | undefined = params.waypoints[0];
    if (!prev) return;
    this.points.push(prev);

    params.waypoints.slice(1).forEach(waypoint => {
      next = waypoint;

      if (prev) {
        if (next.x !== prev.x) {
          for (let offset = 1; offset <= Math.abs(next.x - prev.x); ++offset) {
            this.points.push(
              $v(prev.x + offset * Math.sign(next.x - prev.x), prev.y),
            );
          }
        } else if (next.y !== prev.y) {
          for (let offset = 1; offset <= Math.abs(next.y - prev.y); ++offset) {
            this.points.push(
              $v(prev.x, prev.y + offset * Math.sign(next.y - prev.y)),
            );
          }
        }
      }

      prev = next;
    });
  }
}
