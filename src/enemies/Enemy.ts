import { b_, BpxVector2d, u_, v_ } from "@beetpx/beetpx";
import { g, p8c } from "../globals";
import { SpriteWithOffset } from "../misc/SpriteWithOffset";
import { Path } from "../warzone/Path";
import { EnemyType } from "./Enemies";
import { EnemyRange } from "./EnemyRange";
import { Health } from "./Health";
import { PathProgression } from "./PathProgression";

export class Enemy {
  readonly #type: EnemyType;
  #onReachedPathEnd: () => void;

  readonly #pathProgression: PathProgression;

  readonly #health: Health;

  #range: EnemyRange;

  #isTakingDamage: boolean;

  constructor(params: {
    type: EnemyType;
    path: Path;
    onReachedPathEnd: () => void;
  }) {
    this.#type = params.type;
    this.#onReachedPathEnd = params.onReachedPathEnd;

    this.#pathProgression = new PathProgression({
      path: params.path,
    });

    this.#health = new Health(g.enemies[this.#type].health);

    this.#range = new EnemyRange(this.#center(), g.enemies[this.#type].hitboxR);

    this.#isTakingDamage = false;
  }

  #center(): BpxVector2d {
    const sprite = this.#currentSprite();
    return this.#pathProgression.currentXy().add(sprite.hitboxOffset);
  }

  centerXy(): BpxVector2d {
    return this.#center();
  }

  hasFinished(): boolean {
    return this.#health.value <= 0 || this.#pathProgression.hasReachedEnd();
  }

  get range(): EnemyRange {
    return this.#range;
  }

  takeDamage(damage: number): void {
    this.#isTakingDamage = true;
    this.#health.subtract(damage);
  }

  preUpdate(): void {
    this.#isTakingDamage = false;
  }

  update(): void {
    this.#pathProgression.update();

    if (this.#pathProgression.hasReachedEnd()) {
      this.#onReachedPathEnd();
      this.#onReachedPathEnd = u_.noop;
    }

    this.#range = new EnemyRange(this.#center(), g.enemies[this.#type].hitboxR);
  }

  draw(): void {
    if (this.#pathProgression.hasReachedEnd()) {
      return;
    }

    //
    const sprite = this.#currentSprite();
    const position = this.#pathProgression.currentXy();
    b_.drawSprite(sprite.sprite, position.add(sprite.offset));

    if (b_.debug && this.#health.value > 0) {
      const healthBarLength = Math.ceil(this.#health.value / 4);
      b_.drawLine(position.add(0, -2), v_(healthBarLength, 1), p8c.darkRed);
    }

    if (b_.debug) {
      this.#range.draw(p8c.lightYellow);
    }

    if (this.#isTakingDamage) {
      const damageSprite = this.#currentDamageSprite();
      b_.drawSprite(damageSprite.sprite, position.add(damageSprite.offset));
    }
  }

  #currentSprite(): SpriteWithOffset {
    switch (this.#pathProgression.currentDirection()) {
      case "left":
        return g.enemies[this.#type].spriteLeft;
      case "right":
        return g.enemies[this.#type].spriteRight;
      case "up":
        return g.enemies[this.#type].spriteUp;
      case "down":
        return g.enemies[this.#type].spriteDown;
    }
  }

  #currentDamageSprite(): SpriteWithOffset {
    switch (this.#pathProgression.currentDirection()) {
      case "left":
        return g.enemies[this.#type].spriteDamageLeft;
      case "right":
        return g.enemies[this.#type].spriteDamageRight;
      case "up":
        return g.enemies[this.#type].spriteDamageUp;
      case "down":
        return g.enemies[this.#type].spriteDamageDown;
    }
  }
}
