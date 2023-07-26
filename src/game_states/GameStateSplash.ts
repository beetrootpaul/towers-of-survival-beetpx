import { GameState } from "./GameState";

export class GameStateSplash implements GameState {
  update(): GameState {
    return this;
  }

  draw(): void {}
}
