import { $d, $v } from "@beetpx/beetpx";
import { TowerChoice } from "../game_state/TowerChoice";
import { g, p8c } from "../globals";

export class TowerInfo {
  readonly #towerChoice: TowerChoice;

  constructor(params: { towerChoice: TowerChoice }) {
    this.#towerChoice = params.towerChoice;
  }

  draw(): void {
    const chosenTower = this.#towerChoice.chosenTower;
    $d.sprite(chosenTower.sprite, $v(2, 2));
    $d.text(chosenTower.label, $v(g.warzoneBorder, 2), p8c.lavender);
  }
}
