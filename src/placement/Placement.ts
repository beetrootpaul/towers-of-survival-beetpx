import { FillPattern, Vector2d, v_ } from "@beetpx/beetpx";
import { Money } from "../game_state/Money";
import { TowerChoice, TowerDescriptor } from "../game_state/TowerChoice";
import { b, g, p8c } from "../globals";
import { Tile } from "../misc/Tile";
import { Tower } from "../towers/Tower";
import { TowerRange } from "../towers/TowerRange";
import { TowerRangeBooster } from "../towers/TowerRangeBooster";
import { TowerRangeLaser } from "../towers/TowerRangeLaser";
import { TowerRangeVBeam } from "../towers/TowerRangeVBeam";
import { Towers } from "../towers/Towers";
import { Warzone } from "../warzone/Warzone";
import { ChosenTileBorder } from "./ChosenTileBorder";

export class Placement {
  readonly #chosenTower: TowerDescriptor;
  readonly #warzone: Warzone;
  readonly #otherTowers: Towers;
  readonly #money: Money;

  #chosenTile: Tile;

  #chosenTileBorder: ChosenTileBorder;

  #towerRange: TowerRange;

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

    this.#towerRange = this.#newTowerRange();
  }

  #newTowerRange(): TowerRange {
    switch (this.#chosenTower.type) {
      case "laser":
        return new TowerRangeLaser({ tile: this.#chosenTile });
      case "v_beam":
        return new TowerRangeVBeam({ tile: this.#chosenTile });
      case "booster":
        return new TowerRangeBooster({
          tile: this.#chosenTile,
          warzone: this.#warzone,
        });
    }
  }

  #checkIfCanBuild(): { canBuild: boolean; collidingTowers: Tower[] } {
    const result: { canBuild: boolean; collidingTowers: Tower[] } = {
      canBuild: true,
      collidingTowers: [],
    };

    if (this.#money.available < this.#chosenTower.cost) {
      result.canBuild = false;
    }

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

  moveChosenTile(direction: Vector2d): void {
    this.#chosenTile = this.#chosenTile.plus(direction);
    this.#chosenTile = new Tile(
      this.#chosenTile.xy.clamp(Vector2d.zero, g.warzoneSizeTiles.sub(1))
    );

    this.#towerRange = this.#newTowerRange();

    this.#chosenTileBorder = new ChosenTileBorder(this.#chosenTile);
  }

  draw(): void {
    b.sprite(
      this.#chosenTower.sprite,
      this.#chosenTile.xy.add(g.warzoneBorderTiles).mul(g.tileSize)
    );

    this.#towerRange.draw(p8c.white, p8c.darkGrey);

    const canBuildCheckResult = this.#checkIfCanBuild();

    for (const collidingTower of canBuildCheckResult.collidingTowers) {
      b.setFillPattern(FillPattern.of(0b1010_0101_1010_0101));
      b.rectFilled(collidingTower.xy, v_(g.tileSize, g.tileSize), p8c.red);
      b.setFillPattern(FillPattern.primaryOnly);
    }

    this.#chosenTileBorder.draw(canBuildCheckResult.canBuild);
  }
}
