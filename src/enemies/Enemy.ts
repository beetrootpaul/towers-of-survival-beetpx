import { BeetPx, BpxSprite, BpxVector2d } from "beetpx";
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

  #health: Health;
  #range: EnemyRange;

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

    // TODO: migrate from Lua
    //     local health = new_health {
    //         max_value = a.enemies[enemy_type].health,
    //     }

    this.#health = new Health(g.enemies[this.#type].health);

    this.#range = new EnemyRange(this.#center(), g.enemies[this.#type].hitboxR);

    // TODO: migrate from Lua
    //     local is_taking_damage = false
  }

  #center(): BpxVector2d {
    // TODO: migrate from Lua
    //         local sprite = u.r(a.enemies[enemy_type]["sprite_" .. path_progression.current_direction()])
    const sprite: BpxSprite = g.enemies[this.#type].spriteRight;
    // TODO: migrate from Lua
    //         local s_hox, s_hoy = sprite[7], sprite[8]
    //         return path_progression.current_xy().plus(s_hox, s_hoy)
    return this.#pathProgression.currentXy();
  }

  hasFinished(): boolean {
    return this.#health.value <= 0 || this.#pathProgression.hasReachedEnd();
  }

  // TODO: migrate from Lua
  //     function s.range()
  //         return range
  //     end
  //
  //     function s.center_xy()
  //         return center_xy()
  //     end
  //
  //     function s.take_damage(damage)
  //         is_taking_damage = true
  //         health.subtract(u.r(damage))
  //     end
  //
  //     function s.pre_update()
  //         is_taking_damage = false
  //     end

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
    const sprite: BpxSprite = g.enemies[this.#type].spriteRight;
    //         local s_x, s_y, s_w, s_h, s_ox, s_oy = sprite[1], sprite[2], sprite[3], sprite[4], sprite[5], sprite[6]
    // TODO: migrate from Lua
    //         local position = path_progression.current_xy()
    const position = this.#pathProgression.currentXy();
    // TODO: make spritesheet key not needed here
    // TODO: migrate from Lua
    //         sspr(s_x, s_y, s_w, s_h, position.x + s_ox, position.y + s_oy)
    BeetPx.sprite(g.assets.spritesheet, sprite, position);

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

    // TODO: migrate from Lua
    //         if is_taking_damage then
    //             local damage_sprite = u.r(a.enemies[enemy_type]["sprite_damage_" .. path_progression.current_direction()])
    //             local ds_x, ds_y, ds_w, ds_h, ds_ox, ds_oy = damage_sprite[1], damage_sprite[2], damage_sprite[3], damage_sprite[4], damage_sprite[5], damage_sprite[6]
    //             sspr(ds_x, ds_y, ds_w, ds_h, position.x + ds_ox, position.y + ds_oy)
    //         end
  }
}
