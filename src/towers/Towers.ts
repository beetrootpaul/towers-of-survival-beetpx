import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { TowerDescriptor } from "../game_state/TowerChoice";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { Tower } from "./Tower";

export class Towers {
  readonly #enemies: Enemies;
  readonly #fight: Fight;
  readonly #warzone: Warzone;
  readonly #towers: Tower[];

  constructor(params: { warzone: Warzone; enemies: Enemies; fight: Fight }) {
    this.#enemies = params.enemies;
    this.#fight = params.fight;
    this.#warzone = params.warzone;

    this.#towers = [];
  }

  // TODO: migrate from Lua
  // function s.find_colliding_towers(chosen_tower_type, chosen_tile)
  //     local colliding = {}
  //     for tower in all(towers) do
  //         if tower.is_at(chosen_tile) then
  //             add(colliding, tower)
  //         end
  //         if chosen_tower_type == "v_beam" or tower.type == "v_beam" then
  //             for tile_y = 0, a.warzone_size_tiles - 1 do
  //                 if tower.is_at(new_tile(chosen_tile.x, tile_y)) and not tower.is_at(chosen_tile) then
  //                     add(colliding, tower)
  //                 end
  //             end
  //         end
  //     end
  //     return colliding
  // end

  buildTower(params: { tile: Tile; towerDescriptor: TowerDescriptor }): void {
    this.#towers.push(
      new Tower({
        descriptor: params.towerDescriptor,
        tile: params.tile,
        // TODO: migrate from Lua
        //         other_towers = s,
        enemies: this.#enemies,
        fight: this.#fight,
        warzone: this.#warzone,
      })
    );
    this.#warzone.ground.makePlainAtAndAround(params.tile);
  }

  // TODO: migrate from Lua
  // function s.count_reaching_boosters(tile)
  //     local counter = 0
  //     for tower in all(towers) do
  //         if tower.type == "booster" and tower.range().reaches(tile) then
  //             counter = counter + 1
  //         end
  //     end
  //     return counter
  // end

  update(): void {
    for (const tower of this.#towers) {
      tower.update();
    }
  }

  draw(): void {
    for (const tower of this.#towers) {
      tower.draw();
    }
  }
}
