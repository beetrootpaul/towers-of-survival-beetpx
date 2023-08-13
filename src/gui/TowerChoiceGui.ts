import { BeetPx } from "@beetpx/beetpx";
import { TowerChoice } from "../game_state/TowerChoice";
import { g } from "../globals";
import { ChosenTowerBorder } from "./ChosenTowerBorder";

export class TowerChoiceGui {
  readonly #towerChoice: TowerChoice;
  readonly #chosenTowerBorder: ChosenTowerBorder;

  constructor(params: { towerChoice: TowerChoice }) {
    this.#towerChoice = params.towerChoice;
    this.#chosenTowerBorder = new ChosenTowerBorder();
  }

  draw(): void {
    const towers = this.#towerChoice.towersInCostOrder();
    towers.forEach((tower, index) => {
      const xy = g.canvasSize
        .sub(g.warzoneBorder)
        .add(-(towers.length - index) * (g.tileSize + 2) + 1, 2);
      BeetPx.sprite(tower.sprite, xy);
      if (tower.type === this.#towerChoice.chosenTower.type) {
        this.#chosenTowerBorder.draw(xy);
      }
    });
  }
}
