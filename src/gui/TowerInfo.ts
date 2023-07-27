import { TowerChoice } from "../game_state/TowerChoice";
import { BeetPx, v_ } from "beetpx";
import { g, p8c } from "../globals";

export class TowerInfo {
  private readonly towerChoice: TowerChoice;

  constructor(params: { towerChoice: TowerChoice }) {
    this.towerChoice = params.towerChoice;
  }

  draw(): void {
    const chosenTower = this.towerChoice.chosenTower;
    BeetPx.sprite(g.assets.spritesheet, chosenTower.sprite, v_(2, 2));
    BeetPx.print(chosenTower.label, v_(g.warzoneBorder, 2), p8c.greyViolet);
  }
}
