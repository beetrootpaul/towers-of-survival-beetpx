import { v_ } from "beetpx";
import { Enemies } from "../enemies/Enemies";
import { Fight } from "../fight/Fight";
import { TowerDescriptor } from "../game_state/TowerChoice";
import { g, u } from "../globals";
import { Tile } from "../misc/Tile";
import { Warzone } from "../warzone/Warzone";
import { Tower, TowerType } from "./Tower";
import { TowerRangeBooster } from "./TowerRangeBooster";

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
        otherTowers: this,
        enemies: this.#enemies,
        fight: this.#fight,
        warzone: this.#warzone,
      })
    );
    this.#warzone.ground.makePlainAtAndAround(params.tile);
  }

  countReachingBoosters(tile: Tile): number {
    return this.#towers.filter(
      (t) =>
        t.type === "booster" &&
        (t.range instanceof TowerRangeBooster
          ? t.range.reaches(tile)
          : u.throwError(
              "Booster tower got assigned a range of a non-booster type"
            ))
    ).length;
  }

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
