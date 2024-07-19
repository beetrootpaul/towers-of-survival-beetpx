import { $v, BpxVector2d } from "@beetpx/beetpx";

export function forEachIntXyWithinRectOf(
  xy1Inclusive: BpxVector2d,
  xy2Exclusive: BpxVector2d,
  cb: (xy: BpxVector2d) => void,
): void {
  for (let x = xy1Inclusive.x; x < xy2Exclusive.x; x++) {
    for (let y = xy1Inclusive.y; y < xy2Exclusive.y; y++) {
      cb($v(x, y));
    }
  }
}
