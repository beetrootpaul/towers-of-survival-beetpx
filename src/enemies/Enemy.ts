import { EnemyType } from "./Enemies";
import { Path } from "../warzone/Path";
import { PathProgression } from "./PathProgression";
import { BeetPx, BpxSprite } from "beetpx";
import { g, u } from "../globals";

export class Enemy {
  readonly #type: EnemyType;
  #onReachedPathEnd: () => void;

  readonly #pathProgression: PathProgression;

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
    //
    //     local function center_xy()
    //         local sprite = u.r(a.enemies[enemy_type]["sprite_" .. path_progression.current_direction()])
    //         local s_hox, s_hoy = sprite[7], sprite[8]
    //         return path_progression.current_xy().plus(s_hox, s_hoy)
    //     end
    //
    //     local range = new_enemy_range {
    //         xy = center_xy(),
    //         r = u.r(a.enemies[enemy_type].hitbox_r),
    //     }
    //
    //     local is_taking_damage = false
    //
  }

  hasFinished(): boolean {
    // TODO: migrate from Lua
    //         return health.value == 0 or path_progression.has_reached_end()
    return this.#pathProgression.hasReachedEnd();
  }

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

    // TODO: migrate from Lua
    //         range = new_enemy_range {
    //             xy = center_xy(),
    //             r = u.r(a.enemies[enemy_type].hitbox_r),
    //         }
  }

  draw(): void {
    // TODO: migrate from Lua
    //         if path_progression.has_reached_end() then
    //             return
    //         end
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
    //
    // TODO: migrate from Lua
    //         if d.enabled and health.value > 0 then
    //             local health_bar_length = ceil(health.value / 4)
    //             line(
    //                 position.x,
    //                 position.y - 2,
    //                 position.x + health_bar_length - 1,
    //                 position.y - 2,
    //                 a.colors.red_dark
    //             )
    //         end
    //
    //         if d.enabled and range then
    //             range.draw(a.colors.yellow)
    //         end
    //
    //         if is_taking_damage then
    //             local damage_sprite = u.r(a.enemies[enemy_type]["sprite_damage_" .. path_progression.current_direction()])
    //             local ds_x, ds_y, ds_w, ds_h, ds_ox, ds_oy = damage_sprite[1], damage_sprite[2], damage_sprite[3], damage_sprite[4], damage_sprite[5], damage_sprite[6]
    //             sspr(ds_x, ds_y, ds_w, ds_h, position.x + ds_ox, position.y + ds_oy)
    //         end
  }
}
