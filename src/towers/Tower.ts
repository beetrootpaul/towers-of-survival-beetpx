import { BeetPx, BpxVector2d } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { TowerDescriptor } from "../game_state/TowerChoice";
import { g, p8c, u } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { TowerRange } from "./TowerRange";
import { TowerRangeBooster } from "./TowerRangeBooster";
import { TowerRangeLaser } from "./TowerRangeLaser";
import { TowerRangeVBeam } from "./TowerRangeVBeam";

export type TowerType = "laser" | "booster" | "v_beam";

export class Tower {
  readonly #descriptor: TowerDescriptor;
  readonly #tile: Tile;
  readonly #enemies: Enemies;
  readonly #fight: Fight;
  readonly #warzone: Warzone;

  readonly #range: TowerRange;

  constructor(params: {
    descriptor: TowerDescriptor;
    tile: Tile;
    enemies: Enemies;
    fight: Fight;
    warzone: Warzone;
  }) {
    this.#descriptor = params.descriptor;
    this.#tile = params.tile;
    // TODO: migrate from Lua
    // local other_towers = u.r(params.other_towers)
    this.#enemies = params.enemies;
    this.#fight = params.fight;
    this.#warzone = params.warzone;

    if (this.#descriptor.type === "laser") {
      this.#range = new TowerRangeLaser({
        tile: this.#tile,
      });
    } else if (this.#descriptor.type === "v_beam") {
      this.#range = new TowerRangeVBeam({
        tile: this.#tile,
      });
    } else if (this.#descriptor.type === "booster") {
      this.#range = new TowerRangeBooster({
        tile: this.#tile,
        warzone: this.#warzone,
      });
    } else {
      throw Error(`Unexpected tower type: "${this.#descriptor.type}"`);
    }
  }

  // TODO: migrate from Lua
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

  get type(): TowerType {
    return this.#descriptor.type;
  }

  get xy(): BpxVector2d {
    return this.#tile.xy.add(g.warzoneBorderTiles).mul(g.tileSize);
  }

  isAt(tileToCheck: Tile): boolean {
    return tileToCheck.isSameAs(this.#tile);
  }

  // TODO: migrate from Lua
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
    let isAttacking = false;

    // TODO: migrate from Lua
    const dps = this.#descriptor.dps;
    if (this.type === "laser" && dps) {
      const range: TowerRangeLaser =
        this.#range instanceof TowerRangeLaser
          ? this.#range
          : u.throwError(
              "Laser tower got assigned a range of a non-laser type"
            );
      this.#enemies.forEachFromFurthest((enemy) => {
        // TODO: migrate from Lua
        if (!isAttacking) {
          // if not is_attacking and range.touches_enemy(enemy) then
          isAttacking = true;
          enemy.takeDamage(dps / g.fps);
          this.#fight.showLaser({
            xy1: range.laserSourceXy(),
            xy2: enemy.centerXy(),
          });
        }
      });
    } else if (this.type === "v_beam" && dps) {
      this.#enemies.forEachFromFurthest((enemy) => {
        // TODO: migrate from Lua
        //                 if range.touches_enemy(enemy) then
        isAttacking = true;
        enemy.takeDamage(dps / g.fps);
        // TODO: migrate from Lua
        //                 end
      });
      if (isAttacking) {
        this.#fight.showBeam({ tileX: this.#tile.xy.x });
      }
    }

    // TODO: migrate from Lua
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

    if (BeetPx.debug) {
      this.#range.draw(p8c.blueDark, p8c.brownDark);
    }
  }
}
