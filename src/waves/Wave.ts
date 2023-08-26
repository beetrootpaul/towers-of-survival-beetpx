import { Timer } from "@beetpx/beetpx";
import { Enemies, EnemyType } from "../enemies/Enemies";
import { b, u } from "../globals";

export type WaveDescriptor = {
  wait: number;
  spawns: string;
};

export class Wave {
  readonly #enemies: Enemies;
  readonly #progressTimer: Timer;
  #spawnTimers: Array<{ timer: Timer; enemyType: EnemyType }>;

  constructor(params: { descriptor: WaveDescriptor; enemies: Enemies }) {
    this.#enemies = params.enemies;

    this.#spawnTimers = [];
    const spawns = params.descriptor.spawns.split(",");
    spawns.forEach((spawn, index) => {
      if (spawn !== "-") {
        this.#spawnTimers.push({
          timer: new Timer(index),
          enemyType:
            spawn === "s"
              ? "small"
              : spawn === "m"
              ? "medium"
              : spawn === "b"
              ? "big"
              : u.throwError(`Unexpected spawn descriptor found: "${spawn}".`),
        });
      }
    });

    this.#progressTimer = new Timer(spawns.length - 1);
  }

  progress(): number {
    return this.#progressTimer.progress;
  }

  update(): void {
    this.#spawnTimers = this.#spawnTimers.filter(({ timer, enemyType }) => {
      const finished = timer.hasFinished;
      if (finished) {
        this.#enemies.spawn(enemyType);
      } else {
        timer.update(b.dt);
      }
      return !finished;
    });

    this.#progressTimer.update(b.dt);
  }
}
