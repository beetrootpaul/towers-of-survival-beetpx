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
      }),
    );
  }

  forEachFromFurthest(callback: (enemy: Enemy) => void): void {
    for (const enemy of this.#enemies) {
      callback(enemy);
    }
  }

  areNoneLeft(): boolean {
    return this.#enemies.length <= 0;
  }

  preUpdate(): void {
    this.#enemies.forEach(enemy => {
      enemy.preUpdate();
    });
  }

  update(): void {
    this.#enemies = this.#enemies
      .filter(enemy => !enemy.hasFinished())
      .map(enemy => {
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
