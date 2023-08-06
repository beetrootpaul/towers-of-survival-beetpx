import { Lives } from "./Lives";
import { Money } from "./Money";
import { TowerChoice } from "./TowerChoice";

export class GameState {
  buildingState: "idle" | "tower-choice" | "tower-placement" = "idle";
  readonly lives: Lives = new Lives();
  readonly money: Money = new Money();
  readonly towerChoice = new TowerChoice();

  hasLostAllLives(): boolean {
    return this.lives.left <= 0;
  }

  update(): void {
    this.money.update();
  }
}
