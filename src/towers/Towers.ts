import { TowerDescriptor } from "../game_state/TowerChoice";
import { Tile } from "../misc/Tile";
import { Tower } from "./Tower";

export class Towers {
  readonly #towers: Tower[];

  constructor() {
    // TODO: migrate from Lua
    // local enemies = u.r(params.enemies)
    // local fight = u.r(params.fight)
    // local warzone = u.r(params.warzone)

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
        //         enemies = enemies,
        //         fight = fight,
        //         warzone = warzone,
      })
    );
    // TODO: migrate from Lua
    //     warzone.ground.make_plain_at_and_around(p.tile)
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
