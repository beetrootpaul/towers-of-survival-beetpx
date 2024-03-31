import { Enemies } from "../enemies/Enemies";
import { g, u } from "../globals";
import { Wait } from "./Wait";
import { Wave, WaveDescriptor } from "./Wave";

export class Waves {
  readonly #enemies: Enemies;

  #waveNumber: number;

  #wave: Wave | null;
  #wait: Wait | null;

  constructor(params: { enemies: Enemies }) {
    this.#enemies = params.enemies;

    this.#waveNumber = 1;

    this.#wave = null;
    this.#wait = new Wait({
      durationSeconds: this.#currentWaveDescriptor().wait,
    });
  }

  isLastWave(): boolean {
    return this.waveNumber >= g.waves.length;
  }

  get wait(): Wait | null {
    return this.#wait;
  }

  get wave(): Wave | null {
    return this.#wave;
  }

  get waveNumber(): number {
    return this.#waveNumber;
  }

  haveSpawnAllEnemies() {
    return this.isLastWave() && this.wave && this.wave.progress() >= 1;
  }

  pauseTimers(): void {
    this.#wait?.pauseTimers();
    this.#wave?.pauseTimers();
  }

  resumeTimers(): void {
    this.#wait?.resumeTimers();
    this.#wave?.resumeTimers();
  }

  update(): void {
    const waitHasEnded = this.#wait && this.#wait.progress() >= 1;
    const waveHasEnded = this.#wave && this.#wave.progress() >= 1;

    this.#wave?.update();

    if (waitHasEnded) {
      this.#wait = null;
      this.#wave = new Wave({
        descriptor: this.#currentWaveDescriptor(),
        enemies: this.#enemies,
      });
    }

    if (waveHasEnded && !this.isLastWave() && this.#enemies.areNoneLeft()) {
      this.#wave = null;
      this.#waveNumber += 1;
      this.#wait = new Wait({
        durationSeconds: this.#currentWaveDescriptor().wait,
      });
    }
  }

  #currentWaveDescriptor(): WaveDescriptor {
    return (
      g.waves[this.waveNumber - 1] ??
      u.throwError(
        `Tried to access non-existent wave descriptor at index ${
          this.waveNumber - 1
        }.`
      )
    );
  }
}
