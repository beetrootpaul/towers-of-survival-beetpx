import { BeetPx, v_ } from "@beetpx/beetpx";
import { TowerChoice } from "../game_state/TowerChoice";
import { g, p8c } from "../globals";

export class TowerInfo {
  readonly #towerChoice: TowerChoice;

  constructor(params: { towerChoice: TowerChoice }) {
    this.#towerChoice = params.towerChoice;
  }

  draw(): void {
    const chosenTower = this.#towerChoice.chosenTower;
    BeetPx.sprite(g.assets.spritesheet, chosenTower.sprite, v_(2, 2));
    BeetPx.print(chosenTower.label, v_(g.warzoneBorder, 2), p8c.lavender);
  }
}
