import { ImageUrl, Sprite, Vector2d, v_ } from "@beetpx/beetpx";

export function spro_(imageUrl: ImageUrl) {
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

export class SpriteWithOffset extends Sprite {
  readonly offset: Vector2d;
  readonly hitboxOffset: Vector2d;

  constructor(
    imageUrl: ImageUrl,
    xy1: Vector2d,
    xy2: Vector2d,
    offset: Vector2d,
    hitboxOffset: Vector2d
  ) {
    super(imageUrl, xy1, xy2);
    this.offset = offset;
    this.hitboxOffset = hitboxOffset;
  }
}
