import { BpxTimer, timer_ } from "@beetpx/beetpx";
import { Enemies, EnemyType } from "../enemies/Enemies";
import { g, u } from "../globals";

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
          timer: timer_(g.fps * index),
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

    this.#progressTimer = timer_(g.fps * (spawns.length - 1));
  }

  progress(): number {
    return this.#progressTimer.progress;
  }

  pauseTimers(): void {
    this.#spawnTimers.forEach(({ timer }) => {
      timer.pause();
    });
    this.#progressTimer.pause();
  }

  resumeTimers(): void {
    this.#spawnTimers.forEach(({ timer }) => {
      timer.resume();
    });
    this.#progressTimer.resume();
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
