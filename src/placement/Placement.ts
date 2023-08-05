import { BeetPx, BpxVector2d, v_ } from "beetpx";
import { Money } from "../game_state/Money";
import { TowerChoice, TowerDescriptor } from "../game_state/TowerChoice";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { Tower } from "../towers/Tower";
import { Towers } from "../towers/Towers";
import { Warzone } from "../warzone/Warzone";
import { ChosenTileBorder } from "./ChosenTileBorder";

export class Placement {
  readonly #chosenTower: TowerDescriptor;
  readonly #warzone: Warzone;
  #chosenTile: Tile;
  #chosenTileBorder: ChosenTileBorder;
  #otherTowers: Towers;
  #money: Money;

  constructor(params: {
    towerChoice: TowerChoice;
    warzone: Warzone;
    otherTowers: Towers;
    money: Money;
  }) {
    this.#chosenTower = params.towerChoice.chosenTower;
    this.#warzone = params.warzone;
    this.#otherTowers = params.otherTowers;
    this.#money = params.money;

    this.#chosenTile = new Tile(v_(4, 5));

    this.#chosenTileBorder = new ChosenTileBorder(this.#chosenTile);

    // TODO: migrate from Lua
    // local function new_tower_range()
    //     if chosen_tower.type == "laser" then
    //         return new_tower_range_laser {
    //             tile = chosen_tile,
    //         }
    //     elseif chosen_tower.type == "v_beam" then
    //         return new_tower_range_v_beam {
    //             tile = chosen_tile,
    //         }
    //     elseif chosen_tower.type == "booster" then
    //         return new_tower_range_booster {
    //             tile = chosen_tile,
    //             warzone = warzone,
    //         }
    //     else
    //         assert(false, "unexpected tower type: " .. chosen_tower.type)
    //     end
    // end
    //
    // local tower_range = new_tower_range()
  }

  #checkIfCanBuild(): { canBuild: boolean; collidingTowers: Tower[] } {
    const result: { canBuild: boolean; collidingTowers: Tower[] } = {
      canBuild: true,
      collidingTowers: [],
    };

    if (this.#money.available < this.#chosenTower.cost) {
      result.canBuild = false;
    }

    // TODO: migrate from Lua
    //     local colliding_towers = other_towers.find_colliding_towers(chosen_tower.type, chosen_tile)
    //     if #colliding_towers > 0 then
    //         result.can_build = false
    //         result.colliding_towers = colliding_towers
    //     end
    const collidingTowers = this.#otherTowers.findCollidingTowers(
      this.#chosenTower.type,
      this.#chosenTile
    );
    if (collidingTowers.length > 0) {
      result.canBuild = false;
      result.collidingTowers = collidingTowers;
    }

    if (!this.#warzone.canHaveTowerAt(this.#chosenTile)) {
      result.canBuild = false;
    }

    return result;
  }

  get chosenTile(): Tile {
    return this.#chosenTile;
  }

  canBuild(): boolean {
    return this.#checkIfCanBuild().canBuild;
  }

  moveChosenTile(direction: BpxVector2d): void {
    this.#chosenTile = this.#chosenTile.plus(direction);
    this.#chosenTile = new Tile(
      this.#chosenTile.xy.clamp(BpxVector2d.zero, g.warzoneSizeTiles.sub(1))
    );

    // TODO: migrate from Lua
    //     tower_range = new_tower_range()

    this.#chosenTileBorder = new ChosenTileBorder(this.#chosenTile);
  }

  draw(): void {
    BeetPx.sprite(
      g.assets.spritesheet,
      this.#chosenTower.sprite,
      this.#chosenTile.xy.add(g.warzoneBorderTiles).mul(g.tileSize)
    );

    // TODO: migrate from Lua
    //     tower_range.draw(a.colors.white, a.colors.grey_dark)

    const canBuildCheckResult = this.#checkIfCanBuild();

    // TODO: migrate from Lua
    //     for tower in all(can_build_check_result.colliding_towers) do
    //         fillp(0xa5a5 + .5)
    //         rectfill(tower.x, tower.y, tower.x + u.ts - 1, tower.y + u.ts - 1, a.colors.red_light)
    //         fillp()
    //     end

    this.#chosenTileBorder.draw(canBuildCheckResult.canBuild);
  }
}
