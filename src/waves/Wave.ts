import { Timer } from "@beetpx/beetpx";
import { Enemies, EnemyType } from "../enemies/Enemies";
import { g } from "../globals";

export type WaveDescriptor = {
  wait: number;
  spawns: string;
};

const extraFrameToProperlySpawnLastEnemy = 1;

export class Wave {
  readonly #enemies: Enemies;
  readonly #timer: Timer;
  readonly #keyMoments: Record<number, EnemyType>;

  constructor(params: { descriptor: WaveDescriptor; enemies: Enemies }) {
    this.#enemies = params.enemies;

    this.#keyMoments = {};
    const spawns = params.descriptor.spawns.split(",");
    spawns.forEach((spawn, index) => {
      const moment =
        g.fps * (spawns.length - 1 - index) +
        extraFrameToProperlySpawnLastEnemy;
      if (spawn === "-") {
      } else if (spawn === "s") {
        this.#keyMoments[moment] = "small";
      } else if (spawn === "m") {
        this.#keyMoments[moment] = "medium";
      } else if (spawn === "b") {
        this.#keyMoments[moment] = "big";
      } else {
        throw Error(`Unexpected spawn descriptor found: "${spawn}".`);
      }
    });

    this.#timer = new Timer({
      frames: g.fps * (spawns.length - 1) + extraFrameToProperlySpawnLastEnemy,
    });
  }

  progress(): number {
    return this.#timer.progress;
  }

  update(): void {
    const enemyTypeToSpawn = this.#keyMoments[this.#timer.framesLeft];
    if (enemyTypeToSpawn) {
      this.#enemies.spawn(enemyTypeToSpawn);
      delete this.#keyMoments[this.#timer.framesLeft];
    }

    this.#timer.update();
  }
}
