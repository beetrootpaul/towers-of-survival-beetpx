import { v_ } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { TowerDescriptor } from "../game_state/TowerChoice";
import { g } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { Tower, TowerType } from "./Tower";

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

  findCollidingTowers(chosenTowerType: TowerType, chosenTile: Tile): Tower[] {
    const colliding: Tower[] = [];
    for (const tower of this.#towers) {
      if (tower.isAt(chosenTile)) {
        colliding.push(tower);
      }
      if (chosenTowerType === "v_beam" || tower.type === "v_beam") {
        for (let tileY = 0; tileY < g.warzoneSizeTiles.y; tileY++) {
          if (
            tower.isAt(new Tile(v_(chosenTile.xy.x, tileY))) &&
            !tower.isAt(chosenTile)
          ) {
            colliding.push(tower);
          }
        }
      }
    }
    return colliding;
  }

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
