import { BpxSprite, BpxVector2d, v_ } from "beetpx";

export function spro_(
  x1: number,
  y1: number,
  w: number,
  h: number,
  offsetX: number,
  offsetY: number,
  hitboxOffsetX?: number,
  hitboxOffsetY?: number
): SpriteWithOffset {
  const xy1 = v_(x1, y1);
  return new SpriteWithOffset(
    xy1,
    xy1.add(v_(w, h)),
    v_(offsetX, offsetY),
    v_(hitboxOffsetX ?? 0, hitboxOffsetY ?? 0)
  );
}

export class SpriteWithOffset extends BpxSprite {
  readonly offset: BpxVector2d;
  readonly hitboxOffset: BpxVector2d;

  constructor(
    xy1: BpxVector2d,
    xy2: BpxVector2d,
    offset: BpxVector2d,
    hitboxOffset: BpxVector2d
  ) {
    super(xy1, xy2);
    this.offset = offset;
    this.hitboxOffset = hitboxOffset;
  }
}
