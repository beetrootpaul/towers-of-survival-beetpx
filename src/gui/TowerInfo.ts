import { v_ } from "@beetpx/beetpx";
import { TowerChoice } from "../game_state/TowerChoice";
import { b, g, p8c } from "../globals";

export class TowerInfo {
  readonly #towerChoice: TowerChoice;

  constructor(params: { towerChoice: TowerChoice }) {
    this.#towerChoice = params.towerChoice;
  }

  draw(): void {
    const chosenTower = this.#towerChoice.chosenTower;
    b.drawSprite(chosenTower.sprite, v_(2, 2));
    b.drawText(chosenTower.label, v_(g.warzoneBorder, 2), p8c.lavender);
  }
}
