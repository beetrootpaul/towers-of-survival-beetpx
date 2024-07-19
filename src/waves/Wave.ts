import { $timer, $u, BpxTimer } from "@beetpx/beetpx";
import { Enemies, EnemyType } from "../enemies/Enemies";
import { g } from "../globals";

export type WaveDescriptor = {
  wait: number;
  spawns: string;
};

export class Wave {
  readonly #enemies: Enemies;
  readonly #progressTimer: BpxTimer;
  #spawnTimers: Array<{ timer: BpxTimer; enemyType: EnemyType }>;

  constructor(params: { descriptor: WaveDescriptor; enemies: Enemies }) {
    this.#enemies = params.enemies;

    this.#spawnTimers = [];
    const spawns = params.descriptor.spawns.split(",");
    spawns.forEach((spawn, index) => {
      if (spawn !== "-") {
        this.#spawnTimers.push({
          timer: $timer(g.fps * index),
          enemyType:
            spawn === "s" ? "small"
            : spawn === "m" ? "medium"
            : spawn === "b" ? "big"
            : $u.throwError(`Unexpected spawn descriptor found: "${spawn}".`),
        });
      }
    });

    this.#progressTimer = $timer(g.fps * (spawns.length - 1));
  }

  progress(): number {
    return this.#progressTimer.progress;
  }

  update(): void {
    this.#spawnTimers = this.#spawnTimers.filter(({ timer, enemyType }) => {
      if (timer.hasFinished) {
        this.#enemies.spawn(enemyType);
      }
      return !timer.hasFinished;
    });
  }
}
