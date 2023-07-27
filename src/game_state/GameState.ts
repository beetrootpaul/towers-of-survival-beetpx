import { Lives } from "./Lives";
import { Money } from "./Money";

export class GameState {
  buildingState: "idle" | "tower-choice" | "tower-placement" = "idle";
  readonly lives: Lives = new Lives();
  readonly money: Money = new Money();
  // TODO: migrate from Lua
  //         tower_choice = new_tower_choice(),

  hasLostAllLives(): boolean {
    return this.lives.left <= 0;
  }

  update(): void {
    this.money.update();
  }
}
