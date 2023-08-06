import { BeetPx, BpxVector2d } from "beetpx";
import { g, p8c, u } from "../globals";
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
    // TODO: migrate from Lua
    //     local path = u.r(params.path)
    this.#onReachedPathEnd = params.onReachedPathEnd;

    this.#pathProgression = new PathProgression({
      path: params.path,
    });

    this.#health = new Health(g.enemies[this.#type].health);

    this.#range = new EnemyRange(this.#center(), g.enemies[this.#type].hitboxR);

    this.#isTakingDamage = false;
  }

  #center(): BpxVector2d {
    // TODO: migrate from Lua
    //         local sprite = u.r(a.enemies[enemy_type]["sprite_" .. path_progression.current_direction()])
    const sprite = g.enemies[this.#type].spriteRight;
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
      this.#onReachedPathEnd = u.noop;
    }

    this.#range = new EnemyRange(this.#center(), g.enemies[this.#type].hitboxR);
  }

  draw(): void {
    if (this.#pathProgression.hasReachedEnd()) {
      return;
    }

    //
    // TODO: migrate from Lua
    //         local sprite = u.r(a.enemies[enemy_type]["sprite_" .. path_progression.current_direction()])
    const sprite = g.enemies[this.#type].spriteRight;
    const position = this.#pathProgression.currentXy();
    // TODO: make spritesheet key not needed here
    // BeetPx.sprite(g.assets.spritesheet, sprite, position);
    BeetPx.sprite(g.assets.spritesheet, sprite, position.add(sprite.offset));

    if (BeetPx.debug && this.#health.value > 0) {
      const healthBarLength = Math.ceil(this.#health.value / 4);
      BeetPx.line(
        position.add(0, -2),
        position.add(healthBarLength, -1),
        p8c.redDark
      );
    }

    if (BeetPx.debug) {
      this.#range.draw(p8c.yellow);
    }

    if (this.#isTakingDamage) {
      // TODO: migrate from Lua
      const damageSprite = g.enemies[this.#type].spriteDamageRight;
      //  local damage_sprite = u.r(a.enemies[enemy_type]["sprite_damage_" .. path_progression.current_direction()])
      BeetPx.sprite(
        g.assets.spritesheet,
        damageSprite,
        position.add(damageSprite.offset)
      );
    }
  }
}
