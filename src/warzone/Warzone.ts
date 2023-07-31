import { Lives } from "../game_state/Lives";
import { Tile } from "../misc/Tile";
import { Cores } from "./Cores";
import { Ground } from "./Ground";
import { Path } from "./Path";
import { Road } from "./Road";

export class Warzone {
  readonly #road: Road;
  readonly #cores: Cores;
  readonly #ground: Ground;

  constructor(params: { lives: Lives }) {
    this.#road = new Road();
    this.#cores = new Cores({
      lives: params.lives,
    });
    this.#ground = new Ground();
  }

  path(): Path {
    return this.#road.path;
  }

  canHaveTowerAt(tile: Tile): boolean {
    return !this.#road.isAt(tile) && this.#ground.isAt(tile);
  }

  draw(): void {
    this.#ground.draw();
    this.#road.draw();
    this.#cores.draw();
  }
}
