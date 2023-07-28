import { Road } from "./Road";
import { Cores } from "./Cores";
import { Lives } from "../game_state/Lives";
import { Ground } from "./Ground";
import { Path } from "./Path";

export class Warzone {
  // TODO: migrate from Lua
  // readonly #lives: Lives;
  readonly #road: Road;
  readonly #cores: Cores;
  readonly #ground: Ground;

  constructor(params: { lives: Lives }) {
    // TODO: migrate from Lua
    // local lives = u.r(params.lives)
    this.#road = new Road();
    this.#cores = new Cores({
      lives: params.lives,
    });
    this.#ground = new Ground();
  }

  // TODO: migrate from Lua
  //         ground = ground,

  path(): Path {
    return this.#road.path;
  }

  // TODO: migrate from Lua
  //         can_have_tower_at = function(tile)
  //             return not road.is_at(tile) and ground.is_at(tile)
  //         end,

  draw(): void {
    this.#ground.draw();
    this.#road.draw();
    this.#cores.draw();
  }
}
