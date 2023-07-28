import { TowerDescriptor } from "../game_state/TowerChoice";
import { Tile } from "../misc/Tile";
import { BeetPx } from "beetpx";
import { g } from "../globals";

export type TowerType = "laser" | "booster" | "v_beam";

export class Tower {
  readonly #descriptor: TowerDescriptor;
  readonly #tile: Tile;

  constructor(params: { descriptor: TowerDescriptor; tile: Tile }) {
    this.#descriptor = params.descriptor;
    this.#tile = params.tile;
    // TODO: migrate from Lua
    // local other_towers = u.r(params.other_towers)
    // local enemies = u.r(params.enemies)
    // local fight = u.r(params.fight)
    // local warzone = u.r(params.warzone)
  }

  // TODO: migrate from Lua
  // local range
  // if tower_descriptor.type == "laser" then
  //     range = new_tower_range_laser {
  //         tile = tile,
  //     }
  // elseif tower_descriptor.type == "v_beam" then
  //     range = new_tower_range_v_beam {
  //         tile = tile,
  //     }
  // elseif tower_descriptor.type == "booster" then
  //     range = new_tower_range_booster {
  //         tile = tile,
  //         warzone = warzone,
  //     }
  // end
  //
  // local function new_shooting_timer()
  //     if tower_descriptor.type == "laser" or tower_descriptor.type == "v_beam" then
  //         local boosts = other_towers.count_reaching_boosters(tile)
  //         return new_timer {
  //             start = u.fps * (tower_descriptor.shooting_time + tower_descriptor.shooting_time_boost * boosts),
  //         }
  //     end
  //     return nil
  // end
  //
  // local function new_charging_timer()
  //     if tower_descriptor.type == "laser" or tower_descriptor.type == "v_beam" then
  //         local boosts = other_towers.count_reaching_boosters(tile)
  //         return new_timer {
  //             start = u.fps * (tower_descriptor.charging_time + tower_descriptor.charging_time_boost * boosts),
  //         }
  //     end
  //     return nil
  // end
  //
  // local charging_timer = new_charging_timer()
  // local shooting_timer
  //
  // local s = {
  //     type = tower_descriptor.type,
  //     x = (a.wbt + tile.x) * u.ts,
  //     y = (a.wbt + tile.y) * u.ts,
  // }
  //
  // function s.is_at(tile_to_check)
  //     return tile_to_check.is_same_as(tile)
  // end
  //
  // function s.range()
  //     return range
  // end

  update(): void {
    // TODO: migrate from Lua
    //     if charging_timer and charging_timer.has_finished() then
    //         charging_timer = nil
    //     elseif shooting_timer and shooting_timer.has_finished() then
    //         shooting_timer = nil
    //         charging_timer = new_charging_timer()
    //     end
    //
    //     if not charging_timer then
    //         local is_attacking = false
    //
    //         if s.type == "laser" then
    //             enemies.for_each_from_furthest(function(enemy)
    //                 if not is_attacking and range.touches_enemy(enemy) then
    //                     is_attacking = true
    //                     enemy.take_damage(tower_descriptor.dps / u.fps)
    //                     fight.show_laser {
    //                         source_xy = range.laser_source_xy(),
    //                         target_xy = enemy.center_xy(),
    //                     }
    //                 end
    //             end)
    //         elseif s.type == "v_beam" then
    //             enemies.for_each_from_furthest(function(enemy)
    //                 if range.touches_enemy(enemy) then
    //                     is_attacking = true
    //                     enemy.take_damage(tower_descriptor.dps / u.fps)
    //                 end
    //             end)
    //             if is_attacking then
    //                 fight.show_beam {
    //                     tile_x = tile.x,
    //                 }
    //             end
    //         end
    //
    //         if is_attacking and not shooting_timer then
    //             shooting_timer = new_shooting_timer()
    //             if s.type == "laser" then
    //                 audio.sfx(a.sfx.laser)
    //             elseif s.type == "v_beam" then
    //                 audio.sfx(a.sfx.v_beam)
    //             end
    //         end
    //     end
    //
    //     if charging_timer then
    //         charging_timer.update()
    //     end
    //     if shooting_timer then
    //         shooting_timer.update()
    //     end
  }

  draw(): void {
    BeetPx.sprite(
      g.assets.spritesheet,
      this.#descriptor.sprite,
      this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize)
    );

    // TODO: migrate from Lua
    //     if d.enabled then
    //         range.draw(a.colors.blue_dark, a.colors.brown_dark)
    //     end
  }
}
