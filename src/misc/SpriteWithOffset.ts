import { BpxImageUrl, BpxSprite, BpxVector2d, v_ } from "@beetpx/beetpx";

export function spro_(imageUrl: BpxImageUrl) {
  return (
    x1: number,
    y1: number,
    w: number,
    h: number,
    offsetX: number,
    offsetY: number,
    hitboxOffsetX?: number,
    hitboxOffsetY?: number
  ) => {
    const xy1 = v_(x1, y1);
    return new SpriteWithOffset(
      imageUrl,
      xy1,
      xy1.add(v_(w, h)),
      v_(offsetX, offsetY),
      v_(hitboxOffsetX ?? 0, hitboxOffsetY ?? 0)
    );
  };
}

export class SpriteWithOffset extends BpxSprite {
  readonly offset: BpxVector2d;
  readonly hitboxOffset: BpxVector2d;

  constructor(
    imageUrl: BpxImageUrl,
    xy1: BpxVector2d,
    xy2: BpxVector2d,
    offset: BpxVector2d,
    hitboxOffset: BpxVector2d
  ) {
    super(imageUrl, xy1, xy2);
    this.offset = offset;
    this.hitboxOffset = hitboxOffset;
  }
}
