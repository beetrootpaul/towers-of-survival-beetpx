import { Path } from "../warzone/Path";
import { Enemy } from "./Enemy";

export type EnemyType = "small" | "medium" | "big";

export class Enemies {
  #enemies: Enemy[] = [];

  readonly #path: Path;
  readonly #onEnemyReachedPathEnd: () => void;

  constructor(params: { path: Path; onEnemyReachedPathEnd: () => void }) {
    this.#path = params.path;
    this.#onEnemyReachedPathEnd = params.onEnemyReachedPathEnd;
  }

  spawn(type: EnemyType): void {
    this.#enemies.push(
      new Enemy({
        type,
        path: this.#path,
        onReachedPathEnd: this.#onEnemyReachedPathEnd,
      })
    );
  }

  // TODO: migrate from Lua
  //     function s.for_each_from_furthest(callback)
  //         foreach(enemies, callback)
  //     end

  areNoneLeft(): boolean {
    return this.#enemies.length <= 0;
  }

  // TODO: migrate from Lua
  //     function s.pre_update()
  //         for enemy in all(enemies) do
  //             enemy.pre_update()
  //         end
  //     end

  update(): void {
    this.#enemies = this.#enemies
      .filter((enemy) => !enemy.hasFinished())
      .map((enemy) => {
        enemy.update();
        return enemy;
      });
  }

  draw(): void {
    for (const enemy of this.#enemies) {
      enemy.draw();
    }
  }
}
